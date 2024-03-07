<script lang="ts" setup>
import { useTodolistStore } from "@/store/modules/todolist"
import { storeToRefs } from "pinia"
const store = useTodolistStore()
const { len, list } = storeToRefs(store)
const { delTodo } = store
</script>

<template>
  <div v-if="len >= 0">
    <div v-for="(item, index) in list" :key="index">
      <div>
        <input type="checkbox" v-model="item.complete" />
        {{ item.title }}
        <button @click="delTodo(index)">删除</button>
      </div>
    </div>
  </div>
  <div v-else>暂无任务</div>
</template>
