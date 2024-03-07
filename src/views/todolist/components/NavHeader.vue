<script lang="ts" setup>
import { useTodolistStore } from "@/store/modules/todolist"
import { ref } from "vue"
const store = useTodolistStore()
const value = ref("")
const enter = () => {
  store.addTodo(value.value)
  value.value = ""
}
</script>

<template>
  <el-input type="text" placeholder="请输入任务名称" v-model="value" @keydown.enter="enter" />
</template>
