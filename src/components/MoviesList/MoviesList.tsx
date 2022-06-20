import { MovieCard } from '../MovieCard/MovieCard';
import { MovieListProps } from './MoviesList.types';
import './MoviesList.css';
import { useEffect, useState } from 'react';

export const MoviesList: React.FC<MovieListProps> = ({ movies, isSavedView }) => {
  const [qty, setQty] = useState(5);
  const [moreQty, setMoreQty] = useState(2);

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setQty((current) => current);
      setMoreQty(2);
    }
    if (window.innerWidth >= 600 && window.innerWidth < 1024) {
      setQty((current) => {
        if (current <= 8) return 8;
        return Math.floor(current / 2) * 2;
      });
      setMoreQty(4);
    }
    if (window.innerWidth >= 1024) {
      setQty((current) => {
        if (current <= 12) return 12;
        return Math.floor(current / 3) * 3;
      });
      setMoreQty(6);
    }
  };

  const handleMore = () => setQty((current) => current + moreQty);

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moviesMap = movies.map((movie, index) => {
    if (!isSavedView && movies.length < qty) {
      return <MovieCard movie={movie} key={movie.id} isSavedView={isSavedView} />;
    } else if (!isSavedView)
      return index < qty ? (
        <MovieCard movie={movie} key={movie.id} isSavedView={isSavedView} />
      ) : null;
    else return <MovieCard movie={movie} key={movie.id} isSavedView={isSavedView} />;
  });

  const message = <p className='movie-list__message'>Кина не будет. Электричество кончилось...</p>;

  return (
    <section className='movie-list'>
      {movies.length ? <ul className='movie-list__cards'>{moviesMap}</ul> : message}
      {isSavedView ? (
        <></>
      ) : (
        <button
          type='button'
          className={movies.length <= qty ? 'movie-list__more-btn_hidden' : 'movie-list__more-btn'}
          onClick={handleMore}
        >
          Ещё
        </button>
      )}
    </section>
  );
};
