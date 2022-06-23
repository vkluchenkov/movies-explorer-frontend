import { Movie } from '../../types/Movie';
import { MoviePayload } from '../../types/payloads';

export interface MovieListProps {
  filteredMovies: Movie[];
  savedMovies: Movie[];
  isSavedView?: boolean;
  keyword: string;
  onSave: (movie: MoviePayload) => Promise<void>;
  onDelete: (movieId: number) => Promise<void>;
}
