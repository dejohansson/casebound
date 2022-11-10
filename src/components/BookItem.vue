<script setup lang="ts">
import { delay } from '@/helpers';
import type Book from '@/models/book';
import type { Mutex } from 'async-mutex';
import { computed, ref, type Ref } from 'vue';

const props = defineProps<{
  bookGenerator: Generator<Book, Book, Book>;
  yPosGenerator: Generator<number, number, number>;
  spawnOffset: number;
  spawnLock: Mutex;
  baseAnimationSpeed: number;
}>();

const book: Ref<Book> = ref(props.bookGenerator.next().value);
const show = ref(false);
const animationSpeed = ref(
  props.baseAnimationSpeed / (Math.log(1 - Math.random()) / -15 + 1)
);

function reset() {
  show.value = false;
  props.spawnLock.runExclusive(async () => {
    book.value = getBook();
    await delay(props.spawnOffset);
    show.value = true;
  });
}

function getBook() {
  const volRegex = /vol\.?\s*(?<volume>\d+)/i;

  while (true) {
    const book = props.bookGenerator.next().value;
    const volMatch = book.title.match(volRegex)?.groups?.volume;
    const volume = volMatch ? parseInt(volMatch) : null;

    if (!volume || volume / (volume + 5) < Math.random()) {
      return book;
    }
  }
}

const styles = computed(() => {
  return {
    top: `${props.yPosGenerator.next().value}px`,
    'max-width': `${
      (5 + 15 * (book.value.weight / 100)) *
      (window.outerHeight / window.outerWidth)
    }vw`,
    'z-index': book.value.weight,
    '--slide-speed': `${animationSpeed.value}s`,
  };
});

props.spawnLock.runExclusive(async () => {
  show.value = true;
  await delay(props.spawnOffset);
});
</script>

<template>
  <Transition appear name="slide" @after-enter="reset" @enter-cancelled="reset">
    <img v-if="show" :src="book.cover" :alt="book.title" :style="styles" />
  </Transition>
</template>

<style scoped>
img {
  max-height: 50vh;
  position: absolute;
  transform: translate(-100%, -50%);
}
.slide-enter-to {
  transform: translate(100vw, -50%);
}
.slide-enter-active {
  transition: transform var(--slide-speed) linear;
}
</style>
