<template>
  <h4>当前时间 {{ formatted }}</h4>
</template>

<script lang="ts" setup name="NowTime">
import { useNow, useDateFormat } from "@vueuse/core"

const formatted = useDateFormat(useNow(), "YYYY-MM-DD HH:mm:ss")
</script>

<style scoped lang="scss"></style>
