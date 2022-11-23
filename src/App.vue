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
  literalHandle: string;
}>();

const literalClient = inject(LiteralApiClientKey) as LiteralApiClient;
const literalUserId: Ref<string | null> = ref(null);
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
const spawnLock = ref(new Mutex());
const animationSpeed = ref(Math.ceil(window.outerWidth / 40));

watch(
  () => props.literalHandle,
  (handle) => {
    if (handle)
      literalClient
        .getProfileIdByHandle(handle)
        .then((profileId) => {
          literalUserId.value = profileId;
        })
        .catch(() => null);
  }
);

watch(
  () => literalUserId.value,
  (userId) => {
    if (userId) {
      literalClient
        .getAllCoversByReadingStateAndProfile(ReadingStatus.FINISHED, userId)
        .then((v) => {
          books.value = v;
          bookGeneratorInstance.value = bookGenerator();
        });
      spawnLock.value.cancel();
      spawnLock.value = new Mutex();
    }
  }
);

onMounted(async () => {
  window.addEventListener('resize', setBookCount);
  window.addEventListener('resize', setAnimationSpeed);
  if (props.literalHandle)
    literalClient
      .getProfileIdByHandle(props.literalHandle)
      .then((profileId) => {
        literalUserId.value = profileId;
      })
      .catch(() => null);
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
      :spawnLock="spawnLock as Mutex"
      :baseAnimationSpeed="animationSpeed"
    />
  </div>
</template>

<style>
@import './assets/base.css';
</style>
