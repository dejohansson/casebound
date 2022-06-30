<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { LiteralApiClientKey } from "./injectionKeys";
import BookItem from "./components/BookItem.vue";
import ReadingStatus from "./literal/models/readingStatus";
import type LiteralApiClient from "./literal/literalApiClient";

const id = import.meta.env.VITE_LITERAL_PROFILE_ID;
const literalClient = inject(LiteralApiClientKey) as LiteralApiClient;
const covers = ref();

onMounted(async () => {
  covers.value = await literalClient.getCoversByReadingStateAndProfile({
    limit: 100,
    offset: 0,
    readingStatus: ReadingStatus.FINISHED,
    profileId: id,
  });
});
</script>

<template>
  <BookItem v-for="cover in covers" :cover="cover" />
</template>

<style>
@import "./assets/base.css";

#app {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, 190px);
  justify-content: space-between;
}
</style>
