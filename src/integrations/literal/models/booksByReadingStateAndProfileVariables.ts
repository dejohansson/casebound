import type ReadingStatus from './readingStatus';

export default interface BooksByReadingStateAndProfileVariables {
  limit: number;
  offset: number;
  readingStatus: ReadingStatus;
  profileId: string;
}
