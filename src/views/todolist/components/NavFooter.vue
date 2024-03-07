<script lang="ts" setup>
import { useTodolistStore } from "@/store/modules/todolist"
import { storeToRefs } from "pinia"
const store = useTodolistStore()
const { isComplete, len } = storeToRefs(store)
const { clear } = store
</script>
<template>
  <div>已完成 {{ isComplete }} / 全部 {{ len }}</div>
  <el-button type="primary" @click="clear()">清除已完成</el-button>
</template>
