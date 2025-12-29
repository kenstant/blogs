import { useRouter, useRoute, withBase } from 'vitepress'

/**
 * 组合式函数：处理页面跳转逻辑
 * 封装了 router, route 和 withBase 的调用，简化组件端的使用
 */
export function useHandleLink() {
  const router = useRouter()
  const route = useRoute()

  return (link) => {
    if (!link) return

    // 如果是相对路径 (不以 / 开头，且不是 http 等协议)
    if (!link.startsWith('/') && !link.includes('://')) {
      // 移除当前路径末尾的 /index.html 或 /
      const currentDir = route.path.replace(/\/index\.html?$/, '').replace(/\/$/, '')
      // 移除目标链接开头的 ./ 和 末尾的 .md 扩展名
      const cleanLink = link.replace(/^\.\//, '').replace(/\.md$/, '')
      router.go(`${currentDir}/${cleanLink}`)
    } else {
      // 绝对路径或外部链接，使用 withBase 处理
      router.go(withBase(link))
    }
  }
}
