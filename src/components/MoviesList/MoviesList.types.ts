import { Movie } from '../../types/Movie';

export interface MovieListProps {
  movies: Movie[];
  isSavedView?: boolean;
}
