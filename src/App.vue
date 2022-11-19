<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
import { LiteralApiClientKey } from './injectionKeys';
import BookItem from './components/BookItem.vue';
import ReadingStatus from './literal/models/readingStatus';
import type LiteralApiClient from './literal/literalApiClient';
import { shuffle, vdc } from './helpers';
import type Book from './models/book';
import { Mutex } from 'async-mutex';

const props = defineProps<{
  literalUserId: string;
}>();

const literalClient = inject(LiteralApiClientKey) as LiteralApiClient;
const books: Ref<Book[]> = ref([]);
const nBooks = ref(
  Math.ceil((window.outerWidth * 2 + window.outerHeight) / 250)
);
const bookGeneratorInstance: Ref<Generator<Book, Book, Book>> = ref(
  bookGenerator()
);
const yPosGeneratorInstance: Ref<Generator<number, number, number>> = ref(
  yPosGenerator()
);
const spawnLock = new Mutex();
const animationSpeed = ref(Math.ceil(window.outerWidth / 40));

watch(
  () => props.literalUserId,
  (uid) => {
    if (uid)
      literalClient
        .getAllCoversByReadingStateAndProfile(ReadingStatus.FINISHED, uid)
        .then((v) => {
          books.value = v;
          bookGeneratorInstance.value = bookGenerator();
        });
  }
);

onMounted(async () => {
  window.addEventListener('resize', setBookCount);
  window.addEventListener('resize', setAnimationSpeed);
  if (props.literalUserId)
    books.value = await literalClient.getAllCoversByReadingStateAndProfile(
      ReadingStatus.FINISHED,
      props.literalUserId
    );
});

onUnmounted(() => {
  window.removeEventListener('resize', setBookCount);
  window.removeEventListener('resize', setAnimationSpeed);
});

function setAnimationSpeed() {
  animationSpeed.value = Math.ceil(window.outerWidth / 40);
}

function setBookCount() {
  nBooks.value = Math.ceil((window.outerWidth * window.outerHeight) / 150000);
}

function* bookGenerator(): Generator<Book, Book, Book> {
  while (true) {
    shuffle(books.value);
    for (const book of books.value) {
      yield book;
    }
  }
}

function* yPosGenerator(): Generator<number, number, number> {
  const vdcGen = vdc();
  while (true) {
    yield vdcGen.next().value * window.outerHeight;
  }
}
</script>

<template>
  <div v-if="books.length > 0">
    <BookItem
      v-for="index in nBooks"
      :key="index"
      :bookGenerator="bookGeneratorInstance"
      :yPosGenerator="yPosGeneratorInstance"
      :spawnOffset="(1000 * animationSpeed) / nBooks"
      :spawnLock="spawnLock"
      :baseAnimationSpeed="animationSpeed"
    />
  </div>
</template>

<style>
@import './assets/base.css';
</style>
