import { useCallback, useEffect, useMemo, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { MoviesList } from '../MoviesList/MoviesList';
import { SearchBar } from '../SearchBar/SearchBar';
import { movies } from '../../mocks/movies';
import { MoviesProps } from './Movies.types';
import './Movies.css';

export const Movies: React.FC<MoviesProps> = ({ isSavedView }) => {
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [renderMovies, setRenderMovies] = useState(movies);

  const searchResult = useMemo(
    () =>
      movies.filter((movie) => movie.nameRU.toLowerCase().includes(currentKeyword.toLowerCase())),
    [currentKeyword]
  );

  const filterHandler = useCallback(
    (isFilter: boolean) => {
      if (isFilter) {
        setRenderMovies((current) => {
          const filtered = current.filter((movie) => movie.duration <= 40);
          return filtered;
        });
      } else setRenderMovies(searchResult);
    },
    [searchResult]
  );

  const searchHandler = useCallback((keyword: string) => setCurrentKeyword(keyword), []);

  useEffect(() => {
    setRenderMovies(searchResult);
  }, [searchResult]);

  return (
    <>
      <Header />
      <main className='movies'>
        <SearchBar onFilter={filterHandler} onSearch={searchHandler} />
        <MoviesList movies={renderMovies} isSavedView={isSavedView} keyword={currentKeyword} />
      </main>
      <Footer />
    </>
  );
};
