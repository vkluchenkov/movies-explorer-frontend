import { Movie } from '../../types/Movie';

export interface MovieCardProps {
  movie: Movie;
  isSaved?: boolean;
  isSavedView?: boolean;
}
