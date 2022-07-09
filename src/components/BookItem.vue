<script setup lang="ts">
import { getRandomInt } from '@/helpers';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps<{
  getNextCover: () => string;
  initialDelay: number;
}>();

const cover = ref(props.getNextCover());
const show = ref(false);
const animationSpeed = ref(Math.ceil(window.outerWidth / 100));

onMounted(async () => {
  window.addEventListener('resize', setAnimationSpeed);
});

onUnmounted(() => window.removeEventListener('resize', setAnimationSpeed));

function setAnimationSpeed() {
  animationSpeed.value = Math.ceil(window.outerWidth / 100);
}

setTimeout(() => {
  show.value = true;
}, props.initialDelay * 1000);

setTimeout(() => {
  newBook();
}, props.initialDelay * 1000 + animationSpeed.value * 1000);

function newBook() {
  show.value = false;
  cover.value = props.getNextCover();
  setTimeout(() => {
    show.value = true;
    setTimeout(() => {
      newBook();
    }, animationSpeed.value * 1000);
  }, 1);
}

const styles = computed(() => {
  return {
    top: `${getRandomInt(
      -window.outerHeight * 0.2,
      window.outerHeight * 0.8
    )}px`,
    '--z-index': `${getRandomInt(0, 700)}`,
    '--slide-speed': `${animationSpeed.value}s`,
  };
});
</script>

<template>
  <transition name="slide">
    <img v-if="show" :src="cover" :style="styles" />
  </transition>
</template>

<style scoped>
img {
  max-height: 30vh;
  max-width: 60vw;
  position: absolute;
  z-index: var(--z-index);
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(100vw);
}
.slide-enter-active {
  transition: transform var(--slide-speed) linear;
}
</style>
5
