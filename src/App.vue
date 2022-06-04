<script setup lang="ts">
import { type ApolloClient, type NormalizedCacheObject, gql } from "@apollo/client/core";
import { inject, onMounted, ref } from "vue";
import { LiteralClientKey } from "./injectionKeys";
import Book from "./components/Book.vue";

const id = import.meta.env.VITE_LITERAL_PROFILE_ID;
const apolloClient = inject(LiteralClientKey) as ApolloClient<NormalizedCacheObject>;
const title = ref("");
const cover = ref("");

onMounted(async () => {
  const res = (
    await apolloClient.query({
      query: gql`
        query booksByReadingStateAndProfile(
          $limit: Int!
          $offset: Int!
          $readingStatus: ReadingStatus!
          $profileId: String!
        ) {
          booksByReadingStateAndProfile(
            limit: $limit
            offset: $offset
            readingStatus: $readingStatus
            profileId: $profileId
          ) {
            title
            cover
          }
        }
      `,
      variables: {
        limit: 300,
        offset: 0,
        readingStatus: "FINISHED",
        profileId: id,
      },
    })
  ).data;

  title.value = res.booksByReadingStateAndProfile[0].title;
  cover.value = res.booksByReadingStateAndProfile[0].cover;

  console.log(title, cover);
});
</script>

<template>
  <Book :title="title" :cover="cover" />
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
