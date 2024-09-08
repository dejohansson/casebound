import type Image from './image';
import type Book from './book';

export default interface UserBook {
  id: number;
  edition: Edition;
  rating: number;
  book: Book;
}

interface Edition {
  title: string;
  image: Image | null;
}
