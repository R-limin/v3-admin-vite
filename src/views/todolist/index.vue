<script lang="ts" setup>
import NavHeader from "./components/NavHeader.vue"
import NavMain from "./components/NavMain.vue"
import NavFooter from "./components/NavFooter.vue"
import NowTime from "@/components/NowTime/index.vue"
</script>

<template>
  <div class="app-container">
    <NowTime />
    <NavHeader />
    <NavMain />
    <NavFooter />
  </div>
</template>
