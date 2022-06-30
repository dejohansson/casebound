import { ApolloClient, gql, InMemoryCache, type NormalizedCacheObject } from "@apollo/client/core";
import type BooksByReadingStateAndProfileData from "./models/booksByReadingStateAndProfileData";
import type BooksByReadingStateAndProfileVariables from "./models/booksByReadingStateAndProfileVariables";

export default class LiteralApiClient {
  readonly #apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.#apolloClient = new ApolloClient({
      uri: "https://literal.club/graphql",
      cache: new InMemoryCache(),
    });
  }

  async getCoversByReadingStateAndProfile(
    variables: BooksByReadingStateAndProfileVariables
  ): Promise<string[]> {
    return (
      await this.#apolloClient.query<
        BooksByReadingStateAndProfileData,
        BooksByReadingStateAndProfileVariables
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
        variables: variables,
      })
    ).data.booksByReadingStateAndProfile.map((b) => b.cover);
  }
}
