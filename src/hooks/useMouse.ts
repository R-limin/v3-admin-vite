import { ref } from "vue"
import { useEventListener } from "./useEventListener"

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, "mousemove", (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY
  })

  return { x, y }
}
