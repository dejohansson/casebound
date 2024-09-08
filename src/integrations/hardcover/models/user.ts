import type UserBook from './user-book.js';

export default interface User {
  user_books: UserBook[];
}
