import type Book from '@/models/book';
import {
  ApolloClient,
  gql,
  InMemoryCache,
  type NormalizedCacheObject,
} from '@apollo/client/core';
import type LiteralBook from './models/book';
import type BooksByReadingStateAndProfileData from './models/booksByReadingStateAndProfileData';
import type BooksByReadingStateAndProfileVariables from './models/booksByReadingStateAndProfileVariables';
import type QueryReviewsData from './models/queryReviewsData';
import type { QueryReviewsVariables } from './models/queryReviewsVariables';
import type ReadingStatus from './models/readingStatus';

export default class LiteralApiClient {
  readonly #apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.#apolloClient = new ApolloClient({
      uri: 'https://literal.club/graphql',
      cache: new InMemoryCache(),
    });
  }

  async getAllCoversByReadingStateAndProfile(
    readingStatus: ReadingStatus,
    profileId: string,
  ): Promise<Book[]> {
    const batchSize = 100;
    const books: Book[] = [];
    let offset = 0;

    do {
      const literalBookBatch = await this.getCoversByReadingStateAndProfile({
        limit: batchSize,
        offset: offset,
        readingStatus: readingStatus,
        profileId: profileId,
      });

      const ratings = await this.getRatingsByBookIdsAndProfile(
        profileId,
        literalBookBatch.map((b) => b.id),
      );

      literalBookBatch.forEach((book, index) => {
        books.push({
          title: book.title,
          cover: book.cover,
          weight: (ratings[index] ?? 2.5) * 20,
        });
      });

      offset += batchSize;
    } while (books.length > 1 && books.length % batchSize === 0);

    return books;
  }

  async getCoversByReadingStateAndProfile(
    variables: BooksByReadingStateAndProfileVariables,
  ): Promise<LiteralBook[]> {
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
              id
              title
              cover
            }
          }
        `,
        variables: variables,
      })
    ).data.booksByReadingStateAndProfile;
  }

  async getRatingsByBookIdsAndProfile(
    profileId: string,
    bookIds: string[],
  ): Promise<number[]> {
    return (
      await this.#apolloClient.query<QueryReviewsData, QueryReviewsVariables>({
        query: gql`
          query reviews($pairs: [ProfileIdBookIdInput!]!) {
            reviews(pairs: $pairs) {
              rating
            }
          }
        `,
        variables: {
          pairs: bookIds.map((bookId) => ({
            profileId: profileId,
            bookId: bookId,
          })),
        },
      })
    ).data.reviews.map((r) => r?.rating);
  }

  async getProfileIdByHandle(handle: string): Promise<string> {
    return (
      await this.#apolloClient.query<
        { profile: { id: string } },
        { handle: string }
      >({
        query: gql`
          query getProfileParts($handle: String!) {
            profile(where: { handle: $handle }) {
              id
            }
          }
        `,
        variables: {
          handle,
        },
      })
    ).data.profile.id;
  }
}
