# JDK21虚拟线程入门

## 一、什么是虚拟线程？

### 1.1 虚拟线程 vs 平台线程

**平台线程（Platform Thread）：**
- 是操作系统线程的 Java 包装
- 每个线程占用约 1-2MB 栈内存
- 创建和切换成本较高
- 受操作系统线程数限制（通常几百到几千）

**虚拟线程（Virtual Thread）：**
- 是 JVM 管理的轻量级线程
- 每个线程仅占用约 2-4KB 内存（存储在堆中）
- 创建成本极低（纳秒级）
- 可以创建数百万个虚拟线程

### 1.2 虚拟线程的工作原理

- 平台线程由操作系统调度，虚拟线程由JVM调度。
- 虚拟线程在 IO 阻塞时会被**自动挂起**，释放底层平台线程。
- 当 IO 操作完成时，虚拟线程会被重新调度到平台线程上继续执行，但此时运行它的平台线程不一定是先前的那个平台线程
- 这种机制使得一个平台线程可以承载数千个虚拟线程。
- 虚拟线程和平台线程的关系是`M:N`，即`多对多`，通常`M > N`，因为虚拟线程可以创建很多。

```java
// 虚拟线程在等待数据库响应时会被挂起
virtualThread.execute(() -> {
    String result = queryDatabase(); // IO阻塞，虚拟线程挂起
    processResult(result); // IO完成，虚拟线程恢复执行
});
```

### 1.3 如何区分平台线程和虚拟线程

```java
Thread thread = Thread.currentThread();
boolean isVirtual = thread.isVirtual(); // Java 21+

if (isVirtual) {
    System.out.println("这是一个虚拟线程");
} else {
    System.out.println("这是一个平台线程");
}
```

---

## 二、适用场景与快速判断

### 2.1 ✅ 适合使用虚拟线程的场景（IO 密集型）

#### 网络 IO 操作
```java
// ✅ 适合：HTTP请求、RPC调用、微服务调用
executor.execute(() -> {
    String result = httpClient.get("https://api.example.com/data");
    // 处理结果
});
```

#### 数据库操作
```java
// ✅ 适合：数据库查询、批量操作
CompletableFuture.supplyAsync(() -> 
    userMapper.queryByUid(uid), 
    boundedVirtualExecutor
);
```

#### 文件 IO 操作
```java
// ✅ 适合：文件读写、日志写入
executor.execute(() -> {
    Files.readAllLines(Paths.get("large-file.txt"));
    // 处理文件内容
});
```

#### 消息队列操作
```java
// ✅ 适合：发送消息、消费消息
executor.execute(() -> {
    kafkaProducer.send(message);
});
```

### 2.2 ❌ 不适合使用虚拟线程的场景（CPU 密集型）

#### CPU 密集型计算
```java
// ❌ 不适合：大量计算、图像处理、算法运算
executor.execute(() -> {
    // 大量CPU计算，没有IO阻塞
    for (int i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);
    }
});
```

#### 同步锁竞争
```java
// ❌ 不适合：频繁的synchronized、ReentrantLock等
executor.execute(() -> {
    synchronized (lock) {
        // 大量同步操作
    }
});
```

### 2.3 快速判断

**简单判断方法：**
- 如果任务中**频繁发生 IO 阻塞**（网络请求、数据库查询、文件读写等）→ 使用虚拟线程 ✅
- 如果任务主要是**CPU 计算**，很少阻塞 → 使用平台线程 ✅

**决策流程：**
```
开始
  │
  ├─ 是IO密集型任务？
  │   ├─ 是 → 使用虚拟线程
  │   │   ├─ 需要保护下游服务？
  │   │   │   ├─ 是 → 使用有界虚拟线程（Semaphore）
  │   │   │   └─ 否 → 使用无界虚拟线程
  │   │
  │   └─ 否 → 使用平台线程池
  │
  └─ CPU密集型任务 → 使用平台线程池
```

---

## 三、配置方式：无界 vs 有界

### 3.1 无界虚拟线程池（适合大多数 IO 场景）

**适用场景：**
- 任务数量不可预测
- 需要高并发处理
- 主要是 IO 阻塞操作
- 对资源消耗不敏感

**实现方式：**
```java
@Bean("unboundedVirtualExecutor")
public Executor unboundedVirtualExecutor() {
    return Executors.newVirtualThreadPerTaskExecutor();
}
```

**优点：**
- 简单直接，无需配置
- 可以处理任意数量的任务
- 充分利用虚拟线程的优势

**缺点：**
- 如果任务提交速度 > 处理速度，可能无限增长
- 需要确保下游服务能承受并发压力

### 3.2 有界虚拟线程池（需要限流保护）

**适用场景：**
- 需要保护下游服务（数据库、API等）
- 需要控制并发数（例如`semaphore=数据库连接池的最大连接数`）
- 任务可能突发性增长
- 需要资源控制

**实现方式（使用 Semaphore）：**
```java
@Bean("boundedVirtualExecutor")
public Executor boundedVirtualExecutor() {
    final int maxConcurrency = 40; // 限制并发数
    Semaphore semaphore = new Semaphore(maxConcurrency);
    
    ThreadFactory virtualThreadFactory = Thread.ofVirtual()
            .name("bounded-virtual-", 0)
            .factory();
    ExecutorService virtualExecutor = Executors.newThreadPerTaskExecutor(virtualThreadFactory);
    
    return task -> {
        try {
            semaphore.acquire(); // 调用者线程阻塞在这里
            virtualExecutor.execute(() -> {
                try {
                    task.run();
                } finally {
                    semaphore.release(); // 释放许可
                }
            });
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Failed to acquire semaphore permit", e);
        }
    };
}
```

**重要理解：**
- 虚拟线程的创建是在 `virtualExecutor.execute()` 中，只有获取到 Semaphore 许可后才会创建
- `acquire()` 的执行线程取决于调用者线程

**优点：**
- 精确控制并发数
- 保护下游服务
- 防止资源耗尽

**缺点：**
- 超出限制的任务会等待，可能积累等待任务
- 需要合理设置并发数

**注意点：**

- `semaphore`本身可以支持`公平、非公平`，`semaphore.acquire()、semaphore.tryAcquire()、semaphore.tryAcquire(5, TimeUnit.SECONDS)`等配置，可以根据项目情况使用。

### 3.3 不要使用 ThreadPoolExecutor 包装虚拟线程？

虽然技术上可行，但**不推荐**使用 ThreadPoolExecutor 包装虚拟线程，原因如下：
#### 在JEP444中有如下描述：
> Do not pool virtual threads
> Developers will typically migrate application code to the virtual-thread-per-task ExecutorService from a traditional thread-pool based ExecutorService. 
> A thread pool, like any resource pool, is intended to share expensive resources, but virtual threads are not expensive so there is never a need to pool them.
>
> Developers sometimes use thread pools to limit concurrent access to limited resources. 
> For example, if a service cannot handle more than 20 concurrent requests then making all requests to the service via tasks submitted to a thread pool of size 20 will ensure that. 
> This idiom has become ubiquitous because the high cost of platform threads has made thread pools ubiquitous, but do not be tempted to pool virtual threads in order to limit concurrency. 
> Instead, use constructs specifically designed for that purpose, such as semaphores.
>
> In conjunction with thread pools, developers sometimes use thread-local variables to share expensive resources among multiple tasks that share the same thread. 
> For example, if a database connection is expensive to create then you can open it once and store it in a thread-local variable for later use by other tasks in the same thread. 
> If you migrate code from using a thread pool to using a virtual thread per task, be wary of usages of this idiom since creating an expensive resource for every virtual thread may degrade performance significantly. 
> Change such code to use alternative caching strategies so that expensive resources can be shared efficiently among a very large number of virtual threads.

#### 性能对比分析

**重要说明：** 性能差异取决于调用方式和测试环境，两种方式在性能上不一定有明显差异。以下测试代码分别测试两种方式，并提供证明代码。

**测试代码1：ThreadPoolExecutor 包装虚拟线程**
```java
@Test
public void testThreadPoolExecutor() throws InterruptedException {
    int taskCount = 200;
    int maxConcurrency = 40;
    
    ThreadFactory virtualThreadFactory = Thread.ofVirtual()
            .name("pooled-virtual-", 0)
            .factory();
    ThreadPoolExecutor pooledExecutor = new ThreadPoolExecutor(
            20, maxConcurrency,
            60L, TimeUnit.SECONDS,
            new LinkedBlockingQueue<>(100), // 队列容量100
            virtualThreadFactory,
            new ThreadPoolExecutor.CallerRunsPolicy()
    );
    
    AtomicInteger completed = new AtomicInteger(0);
    long start = System.currentTimeMillis();
    
    IntStream.range(0, taskCount).forEach(i -> {
        pooledExecutor.execute(() -> {
            try {
                Thread.sleep(50); // 模拟IO操作
                completed.incrementAndGet();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
    });
    long submitTime = System.currentTimeMillis() - start;
    
    pooledExecutor.shutdown();
    pooledExecutor.awaitTermination(30, TimeUnit.SECONDS);
    
    long totalTime = System.currentTimeMillis() - start;
    System.out.println("ThreadPoolExecutor - 提交耗时: " + submitTime + "ms, 总耗时: " + totalTime + "ms");
    System.out.println("完成任务: " + completed.get() + "/" + taskCount);
}
```

**测试代码2：Semaphore 限制虚拟线程**
```java
@Test
public void testSemaphoreBounded() throws InterruptedException {
    int taskCount = 200;
    int maxConcurrency = 40;
    
    Semaphore semaphore = new Semaphore(maxConcurrency);
    ThreadFactory boundedThreadFactory = Thread.ofVirtual()
            .name("bounded-virtual-", 0)
            .factory();
    ExecutorService virtualExecutor = Executors.newThreadPerTaskExecutor(boundedThreadFactory);
    
    Executor boundedSemaphoreExecutor = task -> {
        try {
            semaphore.acquire(); // 在调用者线程中执行
            virtualExecutor.execute(() -> {
                try {
                    task.run();
                } finally {
                    semaphore.release();
                }
            });
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Failed to acquire semaphore permit", e);
        }
    };
    
    AtomicInteger completed = new AtomicInteger(0);
    long start = System.currentTimeMillis();
    
    IntStream.range(0, taskCount).forEach(i -> {
        boundedSemaphoreExecutor.execute(() -> {
            try {
                Thread.sleep(50); // 模拟IO操作
                completed.incrementAndGet();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
    });
    long submitTime = System.currentTimeMillis() - start;
    
    virtualExecutor.shutdown();
    virtualExecutor.awaitTermination(30, TimeUnit.SECONDS);
    
    long totalTime = System.currentTimeMillis() - start;
    System.out.println("Semaphore限制 - 提交耗时: " + submitTime + "ms, 总耗时: " + totalTime + "ms");
    System.out.println("完成任务: " + completed.get() + "/" + taskCount);
}
```

**测试代码3：证明 CompletableFuture.supplyAsync() 中调用线程的类型**
```java
@Test
public void testCompletableFutureThreadType() throws InterruptedException {
    int maxConcurrency = 1; // 只允许1个并发，确保其他任务会阻塞
    Semaphore semaphore = new Semaphore(maxConcurrency);
    ThreadFactory boundedThreadFactory = Thread.ofVirtual()
            .name("bounded-virtual-", 0)
            .factory();
    ExecutorService virtualExecutor = Executors.newThreadPerTaskExecutor(boundedThreadFactory);
    
    // 记录调用execute()的线程信息
    List<String> callingThreadInfo = new CopyOnWriteArrayList<>();
    
    Executor boundedSemaphoreExecutor = task -> {
        Thread callingThread = Thread.currentThread();
        boolean isVirtual = callingThread.isVirtual();
        String threadName = callingThread.getName();
        
        callingThreadInfo.add("调用execute()的线程: " + threadName + ", 是虚拟线程: " + isVirtual);
        
        try {
            // acquire()在调用者线程中执行
            semaphore.acquire();
            virtualExecutor.execute(() -> {
                try {
                    task.run();
                } finally {
                    semaphore.release();
                }
            });
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Failed to acquire semaphore permit", e);
        }
    };
    
    // 使用CompletableFuture.supplyAsync()调用
    // 注意：这里boundedSemaphoreExecutor作为Executor参数传入
    List<CompletableFuture<String>> futures = IntStream.range(0, 5)
            .mapToObj(i -> CompletableFuture.supplyAsync(() -> {
                // 这个lambda会在boundedSemaphoreExecutor创建的线程中执行
                // 但调用boundedSemaphoreExecutor.execute()的线程是CompletableFuture内部的线程
                try {
                    Thread.sleep(100); // 模拟IO操作
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                return "Task " + i;
            }, boundedSemaphoreExecutor))
            .toList();
    
    CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
    virtualExecutor.shutdown();
    virtualExecutor.awaitTermination(5, TimeUnit.SECONDS);
    
    // 打印调用线程信息
    callingThreadInfo.forEach(System.out::println);
}
```



---

## 四、补充

### 4.1 Spring vs JDK 虚拟线程执行器

**答案：** Spring 的 `VirtualThreadTaskExecutor` 是对 JDK 的封装，功能完全相同。

**区别：**

| 特性 | Spring VirtualThreadTaskExecutor | JDK Executors.newVirtualThreadPerTaskExecutor() |
|------|----------------------------------|------------------------------------------------|
| **接口** | 实现Spring的`TaskExecutor`接口 | 实现标准的`ExecutorService`接口 |
| **集成** | 可以无缝集成Spring的`@Async`等 | 通用Java代码，不依赖Spring |
| **命名** | 支持自定义线程名前缀 | 默认命名，或通过ThreadFactory自定义 |
| **底层实现** | 内部使用`Executors.newThreadPerTaskExecutor()` | JDK原生实现 |
| **功能** | 完全相同 | 完全相同 |

- 在``JDK < 21时``，会加载`spring-core/src/main/java/org/springframework/core/task/VirtualThreadDelegate.java`，其默认实现是 `抛异常`。
- 在 `JDK >= 21时`，会加载`spring-core/src/main/java21/org/springframework/core/task/VirtualThreadDelegate.java`，同时 `java.lang.Thread`中会提供`Thread.ofVirtual()`方法创建虚拟线程，提供`Thread.ofPlatform()`方法创建平台线程。

**使用建议：**

- Spring 项目用 Spring 版本（方便集成 `@Async`）
- 纯 Java 代码用 JDK 版本



### 4.2 观察虚拟线程

- 可以展示虚拟线程和传统线程的线程转储命令

```shell
# 以JSON形式导出
$ jcmd <pid> Thread.dump_to_file -format=json <file>
# text形式导出
$ jcmd <PID> Thread.dump_to_file -format=text <file>
```

但需要注意的是：

> 摘自JEP 444原文：	
>
> ​	The new thread dump format does not include object addresses, locks, JNI statistics, heap statistics, and other information that appears in  traditional thread dumps. Moreover, because it might need to list a  great many threads, generating a new thread dump does not pause the  application.
>
>
> ​	If the system property `jdk.trackAllThreads` is set to `false`, i.e. with the `-Djdk.trackAllThreads=false` command-line option, virtual threads created directly with the `Thread.Builder` API will not always be tracked by the runtime and may not appear in the new thread dump. In that case, the new thread dump would list virtual  threads that are blocked in network I/O operations, and virtual threads  that are created by the new-thread-per-task `ExecutorService` shown above.

翻译：

> ​	新的线程转储格式不包含对象地址、锁、JNI 统计信息、堆统计信息以及传统线程转储中出现的其他信息。此外，由于它可能需要列出大量线程，因此生成新的线程转储不会导致应用程序暂停
> ​	如果设置 `-Djdk.trackAllThreads=false`，那么通过`Thread.Builder`api创建出来的`虚拟线程`将不会被一直被追踪，并且也不一定会出现在`新的线程dump文件`中，而`阻塞在网络I/O操作的虚拟线程`以及`通过ThreadPerTaskExecutor.create()方法创建的虚拟线程,（即常用的Executors.newThreadPerTaskExecutor())`会出现在`新的线程dump文件`中。



### 4.3 无法卸载虚拟线程的情况

> 摘自 Oracle Java 21文档，JEP444中也有阐述。 
>
> ​	The operating system schedules when a platform thread is run. However, the Java runtime schedules when a virtual thread is run. When the Java runtime schedules a virtual thread, it assigns or *mounts* the virtual thread on a platform thread, then the operating system schedules that platform thread as usual. This platform thread is called a *carrier*. After running some code, the virtual thread can *unmount* from its carrier. This usually happens when the virtual thread performs a blocking I/O operation. After a virtual thread unmounts from its carrier, the carrier is free, which means that the Java runtime scheduler can mount a different virtual thread on it.
>
> ​	A virtual thread cannot be unmounted during blocking operations when it is *pinned* to its carrier. A virtual thread is pinned in the following situations:
>
> - The virtual thread runs code inside a `synchronized` block or method
> - The virtual thread runs a `native` method or a foreign function (see [Foreign Function and Memory API](https://docs.oracle.com/en/java/javase/21/core/foreign-function-and-memory-api.html#GUID-FBE990DA-C356-46E8-9109-C75567849BA8))
>
> Pinning does not make an application incorrect, but it might hinder its scalability. Try avoiding frequent and long-lived pinning by revising `synchronized` blocks or methods that run frequently and guarding potentially long I/O operations with java.util.concurrent.locks.ReentrantLock.

大意：

​	当虚拟线程被固定（Pinned）到其载体线程（即平台线程）上时，在执行阻塞操作期间无法被卸载。虚拟线程会在以下两种场景下进入固定状态：

1. 虚拟线程正在执行`synchronized`同步代码块或同步方法中的代码；
2. 虚拟线程正在执行`本地方法（Native Method）`或``外部函数``（详见[Foreign Function and Memory API](https://docs.oracle.com/en/java/javase/21/core/foreign-function-and-memory-api.html#GUID-FBE990DA-C356-46E8-9109-C75567849BA8)）。

线程固定并不会导致应用程序功能异常，但可能会影响应用的可扩展性。建议通过优化频繁执行的`synchronized`同步代码块 / 方法，并使用`java.util.concurrent.locks.ReentrantLock`来保护可能存在长时间阻塞的 I/O 操作，从而避免频繁且持续时间过长的线程固定。

---

## 参考资料

1. **JEP 444: Virtual Threads** - https://openjdk.org/jeps/444
2. **Oracle Java 21 官方文档** - https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html
3. **Spring Framework Virtual Thread Support** - https://docs.spring.io/spring-framework/reference/integration/scheduling.html#scheduling-virtual-threads
4. **Spring Boot 3.2+ Virtual Threads** - https://spring.io/blog/2023/09/20/virtual-threads-in-spring-boot-3-2

---