import { useCallback, useEffect, useMemo, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { MoviesList } from '../MoviesList/MoviesList';
import { SearchBar } from '../SearchBar/SearchBar';
import { MoviesProps } from './Movies.types';
import './Movies.css';
import { Movie } from '../../types/Movie';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

export const Movies: React.FC<MoviesProps> = ({ isSavedView }) => {
  const localStorage = window.localStorage;

  const [currentKeyword, setCurrentKeyword] = useState(
    localStorage.keyword ? localStorage.keyword : ''
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showLoader, setShowLoader] = useState(false);
  const [renderMovies, setRenderMovies] = useState(movies);

  const getMovies = useCallback(async () => {
    setShowLoader(true);
    if (isSavedView) {
      try {
        const res = await mainApi.getMovies();
        if (res) setMovies(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await moviesApi.getMovies();
        if (res) setMovies(res);
      } catch (error) {
        console.log(error);
      }
    }
    setShowLoader(false);
  }, [isSavedView]);

  const searchResult = useMemo(
    () =>
      movies.filter((movie) => movie.nameRU.toLowerCase().includes(currentKeyword.toLowerCase())),
    [currentKeyword, movies]
  );

  const filterHandler = useCallback(() => {
    const filterFlag = JSON.parse(localStorage.filter);
    if (filterFlag) {
      setRenderMovies((current) => {
        const filtered = current.filter((movie) => movie.duration <= 40);
        return filtered;
      });
    } else setRenderMovies(searchResult);
  }, [searchResult, localStorage.filter]);

  const searchHandler = useCallback((keyword: string) => setCurrentKeyword(keyword), []);

  useEffect(() => setRenderMovies(searchResult), [searchResult]);
  useEffect(() => localStorage.setItem('keyword', currentKeyword), [currentKeyword, localStorage]);

  useEffect(() => {
    filterHandler();
  }, [localStorage.filter, filterHandler]);

  useEffect(() => {
    const fetchMovies = async () => getMovies();
    fetchMovies();
  }, [isSavedView, getMovies]);

  return (
    <>
      <Header />
      <main className='movies'>
        <SearchBar onFilter={filterHandler} onSearch={searchHandler} />
        {showLoader ? (
          <div className='movies__preloader-container'>
            <Preloader />
          </div>
        ) : (
          <MoviesList movies={renderMovies} isSavedView={isSavedView} keyword={currentKeyword} />
        )}
      </main>
      <Footer />
    </>
  );
};
