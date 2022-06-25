import { Movie } from '../../types/Movie';
import { MoviePayload } from '../../types/payloads';

export interface MovieCardProps {
  movie: Movie;
  isSaved?: boolean;
  isSavedView?: boolean;
  onSave: (movie: MoviePayload) => Promise<void>;
  onDelete: (movieId: number) => Promise<void>;
}
