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
  height: 300px;
  width: 190px;
}
</style>
