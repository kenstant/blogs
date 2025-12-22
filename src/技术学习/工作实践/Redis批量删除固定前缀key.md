---
title: Redis 批量删除固定前缀 key
date: 2025-12-22
---

# Redis 批量删除固定前缀 key

## 需求背景
Redis中有很多 key使用时没有设置ttl，现在需要手动删除

## 实现方案
使用Python结合Lua脚本来实现批量删除操作。

## 参考代码
- 代码中 [需要替换] 的部分请改为 [你自己的配置]
```Python
import redis
import pymysql
from datetime import datetime, timedelta


# -------------------------- 配置项（请自行填充） --------------------------
# MySQL配置
MYSQL_CONFIG = {
    "host": "需要替换",
    "port": 3306,
    "user": "需要替换",
    "password": "需要替换",
    "database": "需要替换",
    "charset": "utf8mb4",
}

# Redis配置
REDIS_CONFIG = {
    "host": "需要替换",
    "port": 6379,
    "db": 1,  # Redis数据库编号
    "username": "需要替换",
    "password": "需要替换",
    "decode_responses": True,  # 自动解码为字符串
}

# 时间配置：14天前
DAYS_BEFORE = 14
# 分批处理配置：每次处理1000条（按id分段）
BATCH_SIZE = 1000
# ID范围配置：从0开始，到最大id结束
MIN_ID = 0
MAX_ID = 229791  # 你的最大id
# -------------------------------------------------------------------------


# -------------------------- 内嵌Lua脚本 --------------------------
CLEAN_REDIS_LUA_SCRIPT = """
-- 内嵌Lua脚本：检查session key的TTL，无TTL则删除
local prefix = "需要替换"  -- key前缀
local deleted_count = 0         -- 已删除key计数
local skip_not_exists = 0       -- 不存在的key计数
local skip_has_ttl = 0          -- 有TTL的key计数

-- 遍历传入的session_id列表（ARGV参数数组）
for i, session_id in ipairs(ARGV) do
    -- 构建完整redis key
    local redis_key = prefix .. session_id
    -- 获取key的TTL（-1=无过期时间，-2=key不存在，正数=剩余过期时间）
    local ttl = redis.call("TTL", redis_key)

    if ttl == -1 then
        -- 无TTL，执行删除
        redis.call("DEL", redis_key)
        deleted_count = deleted_count + 1
    elseif ttl == -2 then
        -- key不存在，跳过
        skip_not_exists = skip_not_exists + 1
    else
        -- 有TTL，跳过
        skip_has_ttl = skip_has_ttl + 1
    end
end

-- 返回处理结果（Lua表会被自动转为Python字典/列表）
return {deleted_count, skip_not_exists, skip_has_ttl, #ARGV}
"""
# -------------------------------------------------------------------------


def get_mysql_connection():
    """获取MySQL连接"""
    return pymysql.connect(**MYSQL_CONFIG)


def get_redis_client():
    """获取Redis客户端"""
    return redis.Redis(**REDIS_CONFIG)


def get_batch_session_ids(start_id, end_id):
    """查询指定id范围内符合条件的session_id列表"""
    # 计算14天前的时间
    expire_time = datetime.now() - timedelta(days=DAYS_BEFORE)
    expire_time_str = expire_time.strftime("%Y-%m-%d %H:%M:%S")

    batch_session_ids = []
    conn = None
    cursor = None
    try:
        conn = get_mysql_connection()
        cursor = conn.cursor()

        # 查询当前id范围内、14天前创建且未删除的session_id
        sql = """
              SELECT session_id
              FROM my_table
              WHERE id BETWEEN %s AND %s \
              """
        cursor.execute(sql, (start_id, end_id))
        batch_results = cursor.fetchall()

        # 提取session_id
        batch_session_ids = [row[0] for row in batch_results]

    except Exception as e:
        print(f"查询id范围 [{start_id}, {end_id}] 异常: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

    return batch_session_ids


def batch_process_by_id_range():
    """从id=0开始，按每批1000条id范围循环处理，直到最大id"""
    redis_client = get_redis_client()
    # 预加载内嵌Lua脚本，获取脚本SHA1值（提升执行效率）
    script_sha = redis_client.script_load(CLEAN_REDIS_LUA_SCRIPT)

    # 初始化批次起始id
    start_id = MIN_ID
    total_processed = 0
    total_deleted = 0
    batch_num = 1

    while start_id < MAX_ID:
        # 计算当前批次结束id
        end_id = start_id + BATCH_SIZE - 1
        # 避免最后一批超出最大id
        if end_id > MAX_ID:
            end_id = MAX_ID

        print(f"\n===== 第{batch_num}批：处理id范围 [{start_id}, {end_id}] =====")
        # 获取当前批次的session_id
        batch_session_ids = get_batch_session_ids(start_id, end_id)
        batch_count = len(batch_session_ids)

        if not batch_session_ids:
            print("当前批次无符合条件的session_id，跳过")
            # 推进到下一批
            start_id += BATCH_SIZE
            batch_num += 1
            continue

        print(f"当前批次获取到{batch_count}个符合条件的session_id")
        # 执行Lua脚本：传入session_id列表作为ARGV参数，KEYS参数数量为0
        script_result = redis_client.evalsha(
            script_sha,
            0,  # 表示KEYS数组的长度为0（本场景无需使用KEYS）
            *batch_session_ids,  # 解包session_id列表作为ARGV参数
        )

        # 按索引解析列表结果（对应Lua返回的数组顺序）
        deleted_count = script_result[0]
        skip_not_exists = script_result[1]
        skip_has_ttl = script_result[2]
        total_processed_batch = script_result[3]

        # 更新累计统计
        total_processed += total_processed_batch
        total_deleted += deleted_count

        # 打印批次处理结果
        print(f"批次处理结果：")
        print(f"  - 删除无TTL key数量：{deleted_count}")
        print(f"  - 跳过不存在key数量：{skip_not_exists}")
        print(f"  - 跳过有TTL key数量：{skip_has_ttl}")
        print(f"  - 本次处理结束id: {end_id}")

        # 推进到下一批
        start_id += BATCH_SIZE
        batch_num += 1

    # 打印总处理结果
    print(f"\n===== 全部处理完成 =====")
    print(f"累计处理符合条件的session_id总数：{total_processed}")
    print(f"累计删除无TTL的Redis key总数：{total_deleted}")

    # 关闭Redis连接
    redis_client.close()


def main():
    """主流程"""
    print("开始按id分段分批清理任务（内嵌Lua脚本版）...")
    print(f"处理范围：id从{MIN_ID}到{MAX_ID}，每批处理{BATCH_SIZE}条")
    batch_process_by_id_range()
    print("按id分段分批清理任务执行完成")


if __name__ == "__main__":
    main()

```

