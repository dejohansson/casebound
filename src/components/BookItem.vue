<script setup lang="ts">
defineProps<{
  cover: string;
}>();
</script>

<template>
  <img :src="cover" />
</template>

<style scoped>
img {
  height: 265px;
  width: 180px;
}
</style>
