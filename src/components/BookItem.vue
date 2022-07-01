<script setup lang="ts">
import { getRandomInt } from '@/helpers/math';
import { computed } from 'vue';

defineProps<{
  cover: string;
}>();

const styles = computed(() => {
  return {
    left: `${getRandomInt(0, window.outerWidth)}px`,
    top: `${getRandomInt(0, window.outerHeight)}px`,
    '--z-index': `${getRandomInt(0, 700)}`,
  };
});
</script>

<template>
  <img :src="cover" :style="styles" />
</template>

<style scoped>
img {
  margin-top: -100px;
  margin-left: -80px;
  max-width: 180px;
  position: absolute;
  z-index: var(--z-index);
}
</style>
