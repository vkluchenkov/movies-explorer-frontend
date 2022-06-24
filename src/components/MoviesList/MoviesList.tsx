import { MovieCard } from '../MovieCard/MovieCard';
import { MovieListProps } from './MoviesList.types';
import './MoviesList.css';
import { useEffect, useState } from 'react';
import {
  CARDS_IN_ROW_LARGE,
  CARDS_IN_ROW_MEDIUM,
  INITIAL_CARDS_LARGE,
  INITIAL_CARDS_MEDIUM,
  INITIAL_CARDS_SMALL,
  MORE_QTY_LARGE,
  MORE_QTY_MEDIUM,
  MORE_QTY_SMALL,
  WINDOW_SIZE_LARGE,
  WINDOW_SIZE_MEDIUM,
} from '../../utils/config';

export const MoviesList: React.FC<MovieListProps> = ({
  filteredMovies,
  savedMovies,
  isSavedView,
  keyword,
  onSave,
  onDelete,
}) => {
  const [qty, setQty] = useState(INITIAL_CARDS_SMALL);
  const [moreQty, setMoreQty] = useState(MORE_QTY_SMALL);

  const handleResize = () => {
    if (window.innerWidth < WINDOW_SIZE_MEDIUM) {
      setQty((current) => current);
      setMoreQty(INITIAL_CARDS_SMALL);
    }
    if (window.innerWidth >= WINDOW_SIZE_MEDIUM && window.innerWidth < WINDOW_SIZE_LARGE) {
      setQty((current) =>
        current <= INITIAL_CARDS_MEDIUM
          ? INITIAL_CARDS_MEDIUM
          : Math.floor(current / CARDS_IN_ROW_MEDIUM) * CARDS_IN_ROW_MEDIUM
      );
      setMoreQty(MORE_QTY_MEDIUM);
    }
    if (window.innerWidth >= WINDOW_SIZE_LARGE) {
      setQty((current) =>
        current <= INITIAL_CARDS_LARGE
          ? INITIAL_CARDS_LARGE
          : Math.floor(current / CARDS_IN_ROW_LARGE) * CARDS_IN_ROW_LARGE
      );
      setMoreQty(MORE_QTY_LARGE);
    }
  };

  const handleLoadMore = () => setQty((current) => current + moreQty);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderMovies = filteredMovies.map((movie, index) => {
    const isSaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id);
    const card = (
      <MovieCard
        isSaved={isSaved}
        movie={movie}
        key={movie.id}
        isSavedView={isSavedView}
        onSave={onSave}
        onDelete={onDelete}
      />
    );
    if (!isSavedView) return index < qty ? card : null;
    return card;
  });

  const message = (
    <p className='movie-list__message'>
      {keyword ? `По запросу « ${keyword} » ничего не найдено :(` : 'Список фильмов пуст...'}
    </p>
  );

  return (
    <section className='movie-list'>
      {filteredMovies.length ? <ul className='movie-list__cards'>{renderMovies}</ul> : message}
      {filteredMovies.length <= qty || isSavedView ? null : (
        <button type='button' className='movie-list__more-btn' onClick={handleLoadMore}>
          Ещё
        </button>
      )}
    </section>
  );
};
