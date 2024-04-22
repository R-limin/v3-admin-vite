<template>
  <div class="app-container">
    <h4>该实例是演示： 调用hook，获取鼠标位置</h4>
    <div :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }" class="movearea" />
    <h4>Mouse position is at: {{ x }}, {{ y }}</h4>
  </div>
</template>

<script lang="ts" setup>
import { useMouse } from "@/hooks/useMouse"

// 调用useMouse
const { x, y } = useMouse()
</script>

<style scoped lang="scss">
.movearea {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  transition: 0.3s background-color ease;
}
</style>
