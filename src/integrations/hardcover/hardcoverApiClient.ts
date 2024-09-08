import type Book from '@/models/book';
import type Me from './models/me.js';
import {
  ApolloClient,
  HttpLink,
  gql,
  InMemoryCache,
  type NormalizedCacheObject,
} from '@apollo/client/core';

export default class HardcoverApiClient {
  readonly #apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.#apolloClient = new ApolloClient({
      link: new HttpLink({
        uri: 'https://api.hardcover.app/v1/graphql',
      }),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
      },
    });
  }

  async getAllReadBooks(token: string): Promise<Book[]> {
    // Read books has status_id 3
    const userBooks = (
      await this.#apolloClient.query<Me>({
        query: gql`
          query ReadBooks {
            me {
              user_books(where: { status_id: { _eq: 3 } }) {
                id
                book {
                  image {
                    url
                  }
                }
                edition {
                  title
                  image {
                    url
                  }
                }
                rating
              }
            }
          }
        `,
        context: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      })
    ).data.me[0].user_books;

    return userBooks.map((x) => ({
      title: x.edition.title,
      cover: x.edition.image?.url ?? x.book.image.url,
      weight: (x.rating ?? 2.5) * 20,
    }));
  }
}
