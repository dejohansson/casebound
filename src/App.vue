<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
import { LiteralApiClientKey } from './injectionKeys';
import BookItem from './components/BookItem.vue';
import ReadingStatus from './literal/models/readingStatus';
import type LiteralApiClient from './literal/literalApiClient';
import { getRandomInt } from './helpers';

const id = import.meta.env.VITE_LITERAL_PROFILE_ID;
const literalClient = inject(LiteralApiClientKey) as LiteralApiClient;
const covers: Ref<string[]> = ref([]);
const nBooks = ref(
  Math.ceil((window.outerWidth * window.outerHeight) / 200000)
);

onMounted(() => window.addEventListener('resize', setBookCount));

onUnmounted(() => window.removeEventListener('resize', setBookCount));

watch(nBooks, (nBooks, _) => {
  console.log(nBooks);
});

function setBookCount() {
  nBooks.value = Math.ceil((window.outerWidth * window.outerHeight) / 200000);
}

onMounted(async () => {
  covers.value = await literalClient.getAllCoversByReadingStateAndProfile(
    ReadingStatus.FINISHED,
    id
  );
});

function getNextCover() {
  return covers.value[getRandomInt(0, covers.value.length - 1)];
}
</script>

<template>
  <BookItem v-for="index in 1" :key="index" :getNextCover="getNextCover" />
</template>

<style>
@import './assets/base.css';
</style>
