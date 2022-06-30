import { ApolloClient, gql, InMemoryCache, type NormalizedCacheObject } from "@apollo/client/core";
import type ReadingStatus from "./models/readingStatus";

interface Book {
  cover: string;
}

interface BooksByReadingStateAndProfileData {
  booksByReadingStateAndProfile: Book[];
}

interface BooksByReadingStateAndProfileVars {
  limit: number;
  offset: number;
  readingStatus: ReadingStatus;
  profileId: string;
}

export class LiteralApiClient {
  readonly #apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.#apolloClient = new ApolloClient({
      uri: "https://literal.club/graphql",
      cache: new InMemoryCache(),
    });
  }

  async getCoversByReadingStateAndProfile(
    vars: BooksByReadingStateAndProfileVars
  ): Promise<string[]> {
    return (
      await this.#apolloClient.query<
        BooksByReadingStateAndProfileData,
        BooksByReadingStateAndProfileVars
      >({
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
              cover
            }
          }
        `,
        variables: vars,
      })
    ).data.booksByReadingStateAndProfile.map((b) => b.cover);
  }
}
