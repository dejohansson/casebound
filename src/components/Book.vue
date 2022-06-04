<script setup lang="ts">
defineProps<{
  title: string;
  cover: string;
}>();
</script>

<template>
  <img :src="cover" :alt="title" />
</template>

<style scoped></style>
