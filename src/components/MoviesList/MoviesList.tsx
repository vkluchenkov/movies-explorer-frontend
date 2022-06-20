import { MovieCard } from '../MovieCard/MovieCard';
import { MovieListProps } from './MoviesList.types';
import './MoviesList.css';
import { useEffect, useState } from 'react';

export const MoviesList: React.FC<MovieListProps> = ({ movies, isSavedView }) => {
  const [initialQty, setInitialQty] = useState(5);
  const [moreQty, setMoreQty] = useState(2);

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setInitialQty(5);
      setMoreQty(2);
    }
    if (window.innerWidth >= 600 && window.innerWidth < 1024) {
      setInitialQty(8);
      setMoreQty(4);
    }
    if (window.innerWidth >= 1024) {
      setInitialQty(12);
      setMoreQty(6);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moviesMap = movies.map((movie, index) => {
    if (movies.length < initialQty) {
      return <MovieCard movie={movie} key={movie.id} isSavedView={isSavedView} />;
    }
    return index < initialQty ? (
      <MovieCard movie={movie} key={movie.id} isSavedView={isSavedView} />
    ) : null;
  });

  const message = <p className='movie-list__message'>Кина не будет. Электричество кончилось...</p>;

  return (
    <section className='movie-list'>
      {movies.length ? <ul className='movie-list__cards'>{moviesMap}</ul> : message}
      <button type='button' className='movie-list__more-btn'>
        Ещё
      </button>
    </section>
  );
};
