import { ApolloClient, gql, InMemoryCache, type NormalizedCacheObject } from "@apollo/client/core";
import type BooksByReadingStateAndProfileData from "./models/booksByReadingStateAndProfileData";
import type BooksByReadingStateAndProfileVariables from "./models/booksByReadingStateAndProfileVariables";
import type ReadingStatus from "./models/readingStatus";

export default class LiteralApiClient {
  readonly #apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.#apolloClient = new ApolloClient({
      uri: "https://literal.club/graphql",
      cache: new InMemoryCache(),
    });
  }

  async getAllCoversByReadingStateAndProfile(
    readingStatus: ReadingStatus,
    profileId: string
  ): Promise<string[]> {
    const batchSize = 100;
    const covers: string[] = [];
    var offset = 0;

    do {
      var batch = await this.getCoversByReadingStateAndProfile({
        limit: batchSize,
        offset: offset,
        readingStatus: readingStatus,
        profileId: profileId,
      });

      covers.push(...batch);
      offset += batchSize;
    } while (batch.length == batchSize);

    return covers;
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
