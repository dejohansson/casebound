<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
import { LiteralApiClientKey } from './injectionKeys';
import BookItem from './components/BookItem.vue';
import ReadingStatus from './literal/models/readingStatus';
import type LiteralApiClient from './literal/literalApiClient';
import { shuffle } from './helpers';
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

onMounted(async () => {
  window.addEventListener('resize', setBookCount);
  books.value = await literalClient.getAllCoversByReadingStateAndProfile(
    ReadingStatus.FINISHED,
    id
  );
});

onUnmounted(() => window.removeEventListener('resize', setBookCount));

watch(nBooks, (nBooks, _) => {
  console.log('Books' + nBooks);
});

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
</script>

<template>
  <BookItem
    v-if="books.length > 0"
    v-for="index in nBooks"
    :key="index"
    :bookGenerator="bookGeneratorInstance"
    :initialDelay="index / nBooks"
  />
</template>

<style>
@import './assets/base.css';
</style>
