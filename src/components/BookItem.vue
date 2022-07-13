<script setup lang="ts">
import { getRandomInt } from '@/helpers';
import type Book from '@/models/book';
import { computed, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';

const props = defineProps<{
  bookGenerator: Generator<Book, Book, Book>;
  initialDelay: number;
}>();

const book: Ref<Book> = ref(props.bookGenerator.next().value);
const show = ref(false);
const animationSpeed = ref(
  (Math.ceil(window.outerWidth / 40) * getRandomInt(85, 115)) / 100
);

onMounted(async () => {
  window.addEventListener('resize', setAnimationSpeed);
});

onUnmounted(() => window.removeEventListener('resize', setAnimationSpeed));

function setAnimationSpeed() {
  animationSpeed.value =
    (Math.ceil(window.outerWidth / 40) * getRandomInt(85, 115)) / 100;
}

setTimeout(() => {
  show.value = true;
}, props.initialDelay * 1000 * animationSpeed.value);

setTimeout(() => {
  newBook();
}, (props.initialDelay + 1) * 1000 * animationSpeed.value);

function newBook() {
  show.value = false;
  book.value = props.bookGenerator.next().value;
  setTimeout(() => {
    show.value = true;
    setTimeout(() => {
      newBook();
    }, animationSpeed.value * 1000);
  }, 1);
}

const styles = computed(() => {
  return {
    top: `${getRandomInt(0, window.outerHeight)}px`,
    '--z-index': book.value.weight,
    '--slide-speed': `${animationSpeed.value}s`,
  };
});
</script>

<template>
  <transition name="slide">
    <img v-if="show" :src="book.cover" :style="styles" />
  </transition>
</template>

<style scoped>
img {
  max-height: 30vh;
  max-width: 60vw;
  position: absolute;
  z-index: var(--z-index);
  transform: translate(-100%, -50%);
}
.slide-enter-to {
  transform: translate(100vw, -50%);
}
.slide-enter-active {
  transition: transform var(--slide-speed) linear;
}
</style>
5
