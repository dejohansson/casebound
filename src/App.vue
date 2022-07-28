<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, type Ref } from 'vue';
import { LiteralApiClientKey } from './injectionKeys';
import BookItem from './components/BookItem.vue';
import ReadingStatus from './literal/models/readingStatus';
import type LiteralApiClient from './literal/literalApiClient';
import { shuffle, vdc } from './helpers';
import type Book from './models/book';

const id = import.meta.env.VITE_LITERAL_PROFILE_ID;
const literalClient = inject(LiteralApiClientKey) as LiteralApiClient;
const books: Ref<Book[]> = ref([]);
const nBooks = ref(
  Math.ceil((window.outerWidth * window.outerHeight) / 150000)
);
const bookGeneratorInstance: Ref<Generator<Book, Book, Book>> = ref(
  bookGenerator()
);
const yPosGeneratorInstance: Ref<Generator<number, number, number>> = ref(
  yPosGenerator()
);

onMounted(async () => {
  window.addEventListener('resize', setBookCount);
  books.value = await literalClient.getAllCoversByReadingStateAndProfile(
    ReadingStatus.FINISHED,
    id
  );
});

onUnmounted(() => window.removeEventListener('resize', setBookCount));

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
      :initialDelay="index / nBooks"
    />
  </div>
</template>

<style>
@import './assets/base.css';
</style>
