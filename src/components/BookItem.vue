<script setup lang="ts">
import { getRandomInt } from '@/helpers';
import { computed, ref } from 'vue';

const props = defineProps<{
  getNextCover: () => string;
}>();

const cover = ref(props.getNextCover());

setInterval(() => {
  cover.value = props.getNextCover();
}, 1000); //getRandomInt(1000, 25000));

const styles = computed(() => {
  return {
    // left: `${getRandomInt(0, window.outerWidth)}px`,
    // top: `${getRandomInt(0, window.outerHeight)}px`,
    // '--z-index': `${getRandomInt(0, 700)}`,
  };
});
</script>

<template>
  <transition name="hej">
    <img v-if="true" :src="cover" :style="styles" />
  </transition>
</template>

<style scoped>
img {
  margin-top: -100px;
  margin-left: -80px;
  max-width: 180px;
  /* position: absolute; */
  /* z-index: var(--z-index); */
}
.hej-enter-from {
  transform: translateX(20px);
}
.hej-enter-to {
  transform: translateX(1000px);
}
.hej-enter-active {
  transition: 10s;
}
</style>
