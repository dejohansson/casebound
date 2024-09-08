<script setup lang="ts">
import { delay } from '@/helpers';
import type Book from '@/models/book';
import { E_CANCELED, type Mutex } from 'async-mutex';
import { computed, ref, watch, type Ref, toRefs } from 'vue';

const props = defineProps<{
  bookGenerator: Generator<Book, Book, Book>;
  yPosGenerator: Generator<number, number, number>;
  spawnOffset: number;
  spawnLock: Mutex;
  baseAnimationSpeed: number;
}>();
const { baseAnimationSpeed } = toRefs(props);

const book: Ref<Book | null> = ref(null);
const show = ref(false);
const animationSpeed = ref(
  baseAnimationSpeed.value / (Math.log(1 - Math.random()) / -15 + 1),
);

watch(
  () => props.bookGenerator,
  () => {
    if (!show.value) reset();
  },
);

function reset() {
  show.value = false;
  props.spawnLock
    .runExclusive(async () => {
      book.value = getBook();
      show.value = true;
      await delay(props.spawnOffset);
    })
    .catch((e) => {
      if (e !== E_CANCELED) throw e;
    });
}

function getBook() {
  const volRegex = RegExp(/vol\.?\s*(?<volume>\d+)/i);

  while (true) {
    const book = props.bookGenerator.next().value;
    const volMatch = volRegex.exec(book.title)?.groups?.volume;
    const volume = volMatch ? parseInt(volMatch) : null;

    if (!volume || volume / (volume + 1) < Math.random()) {
      return book;
    }
  }
}

const styles = computed(() => {
  return book.value == null
    ? null
    : {
        top: `${props.yPosGenerator.next().value}px`,
        'max-width': `${(25 + book.value.weight * 0.75) / 5}vh`,
        'min-width': `${(25 + book.value.weight * 0.75) / 5}vh`,
        'z-index': book.value.weight,
        '--slide-speed': `${animationSpeed.value}s`,
      };
});

reset();
</script>

<template>
  <Transition
    v-if="show && book != null && styles != null"
    appear
    name="slide"
    @after-enter="reset"
  >
    <img :src="book.cover" :alt="book.title" :style="styles" />
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
