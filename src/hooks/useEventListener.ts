// event.js
import { onMounted, onUnmounted } from "vue"

export function useEventListener(target: EventTarget, event: string, callback: any) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  if (target) {
    console.log(target)
    onMounted(() => target.addEventListener(event, callback))
    onUnmounted(() => target.removeEventListener(event, callback))
  }
}
