<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
import { LiteralApiClientKey } from './injectionKeys';
import BookItem from './components/BookItem.vue';
import ReadingStatus from './literal/models/readingStatus';
import type LiteralApiClient from './literal/literalApiClient';
import { shuffle } from './helpers';

const id = import.meta.env.VITE_LITERAL_PROFILE_ID;
const literalClient = inject(LiteralApiClientKey) as LiteralApiClient;
const covers: Ref<string[]> = ref([]);
const nBooks = ref(
  Math.ceil((window.outerWidth * window.outerHeight) / 100000)
);
const coverGeneratorInstnace: Ref<Generator<string, string, string>> = ref(
  coverGenerator()
);

onMounted(async () => {
  window.addEventListener('resize', setBookCount);
  covers.value = await literalClient.getAllCoversByReadingStateAndProfile(
    ReadingStatus.FINISHED,
    id
  );
});

onUnmounted(() => window.removeEventListener('resize', setBookCount));

watch(nBooks, (nBooks, _) => {
  console.log('Books' + nBooks);
});

function setBookCount() {
  nBooks.value = Math.ceil((window.outerWidth * window.outerHeight) / 100000);
}

function* coverGenerator(): Generator<string, string, string> {
  while (true) {
    shuffle(covers.value);
    var i = 1;
    for (const cover of covers.value) {
      yield cover;
    }
  }
}
</script>

<template>
  <BookItem
    v-if="covers.length > 0"
    v-for="index in nBooks"
    :key="index"
    :coverGenerator="coverGeneratorInstnace"
    :initialDelay="index / nBooks"
  />
</template>

<style>
@import './assets/base.css';
</style>
