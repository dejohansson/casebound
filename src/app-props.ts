export interface AppProps {
  librarySource: LibrarySource;
  literalHandle: string;
  hardcoverToken: string;
}

export enum LibrarySource {
  Hardcover,
  Literal,
}
