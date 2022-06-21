import { MovieCard } from '../MovieCard/MovieCard';
import { MovieListProps } from './MoviesList.types';
import './MoviesList.css';
import { useEffect, useState } from 'react';

export const MoviesList: React.FC<MovieListProps> = ({ movies, isSavedView, keyword }) => {
  const [qty, setQty] = useState(5);
  const [moreQty, setMoreQty] = useState(2);

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setQty((current) => current);
      setMoreQty(2);
    }
    if (window.innerWidth >= 600 && window.innerWidth < 1024) {
      setQty((current) => (current <= 8 ? 8 : Math.floor(current / 2) * 2));
      setMoreQty(4);
    }
    if (window.innerWidth >= 1024) {
      setQty((current) => (current <= 12 ? 12 : Math.floor(current / 3) * 3));
      setMoreQty(6);
    }
  };

  const handleMore = () => setQty((current) => current + moreQty);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderMovies = movies.map((movie, index) => {
    const card = <MovieCard movie={movie} key={movie.id} isSavedView={isSavedView} />;
    if (!isSavedView) return index < qty ? card : null;
    return card;
  });

  const message = (
    <p className='movie-list__message'>
      {movies.length
        ? 'По запросу « <strong>{keyword}</strong> » ничего не найдено :('
        : 'Фильмы отсутствуют'}
    </p>
  );

  return (
    <section className='movie-list'>
      {movies.length ? <ul className='movie-list__cards'>{renderMovies}</ul> : message}
      {movies.length <= qty || isSavedView ? null : (
        <button type='button' className='movie-list__more-btn' onClick={handleMore}>
          Ещё
        </button>
      )}
    </section>
  );
};
