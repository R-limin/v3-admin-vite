import { defineStore } from "pinia"
import { ref, computed } from "vue"

// #region   Option Store
// export const useTodolistStore = defineStore("todo", {
//   state: () => {
//     return {
//       list: [
//         {
//           title: "吃饭",
//           complete: false
//         },
//         {
//           title: "睡觉",
//           complete: false
//         },
//         {
//           title: "code",
//           complete: true
//         }
//       ]
//     }
//   },
//   getters: {
//     len: (state) => state.list.length
//   },
//   actions: {
//     addTodo(state, payload) {
//       state.list.push(payload)
//     },
//     delTodo(state, payload) {
//       state.list.splice(payload, 1)
//     },
//     clear(state, payload) {
//       // 传入过滤后的数组
//       state.list = payload
//     }
//   }
// })
// #endregion

// #region Setup Store
export const useTodolistStore = defineStore("todo", () => {
  const list = ref([
    {
      title: "吃饭",
      complete: false
    },
    {
      title: "睡觉",
      complete: false
    },
    {
      title: "打代码",
      complete: false
    }
  ])
  const len = computed(() => list.value.length)
  const isComplete = computed(() => {
    const arr = list.value.filter((item) => {
      return item.complete
    })
    return arr.length
  })
  function addTodo(addItem: any) {
    let flag = true
    list.value.map((item) => {
      if (item.title === addItem) {
        flag = false
        alert("任务已存在")
      }
    })
    if (flag) {
      list.value.push({
        title: addItem,
        complete: false
      })
    }
  }
  function delTodo(index: number) {
    list.value.splice(index, 1)
  }
  function clear() {
    // 传入过滤后的数组
    list.value = list.value.filter((item) => {
      return item.complete === false
    })
  }
  return {
    list,
    len,
    isComplete,
    addTodo,
    delTodo,
    clear
  }
})
//#endregion
