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
import { MoviePayload } from '../../types/payloads';
import { SHORTIE_DURATION } from '../../utils/config';

export const Movies: React.FC<MoviesProps> = ({ isSavedView }) => {
  const localStorage = window.localStorage;

  const [currentKeyword, setCurrentKeyword] = useState('');
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [showLoader, setShowLoader] = useState(false);
  const [renderMovies, setRenderMovies] = useState(isSavedView ? savedMovies : allMovies);

  const getMovies = useCallback(async () => {
    setShowLoader(true);
    try {
      const saved = await mainApi.getMovies();
      const all = await moviesApi.getMovies();
      if (all) setAllMovies(all);
      if (saved) setSavedMovies(saved);
    } catch (error) {
      console.log(error);
    }
    setShowLoader(false);
  }, []);

  const saveMovieHandler = useCallback(
    async (movie: MoviePayload) => {
      const res = await mainApi.addMovie(movie);
      if (res)
        setSavedMovies((current) => {
          const newMovie = allMovies.find((m) => m.id === movie.movieId);
          const arr = current.slice();
          if (newMovie) {
            arr.push(newMovie);
            return arr;
          }
          return current;
        });
    },
    [allMovies]
  );

  const deleteMovieHandler = useCallback(async (movieId: number) => {
    const res = await mainApi.deleteMovie(movieId);
    if (res) setSavedMovies((current) => current.filter((m) => m.id !== movieId));
  }, []);

  const searchResult = useMemo(() => {
    if (!isSavedView && allMovies.length)
      return allMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(currentKeyword.toLowerCase())
      );
    if (!isSavedView) return [];
    if (savedMovies.length)
      return savedMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(currentKeyword.toLowerCase())
      );
    return [];
  }, [currentKeyword, allMovies, savedMovies, isSavedView]);

  const filterHandler = useCallback(
    (filterFlag: boolean) => {
      if (filterFlag) {
        setRenderMovies((current) => {
          const filtered = current.filter((movie) => movie.duration <= SHORTIE_DURATION);
          return filtered;
        });
      } else setRenderMovies(searchResult);
    },
    [searchResult]
  );

  const searchHandler = useCallback(
    (keyword: string) => {
      setCurrentKeyword(keyword);
      if (!isSavedView) localStorage.setItem('keyword', keyword);
    },
    [isSavedView, localStorage]
  );

  useEffect(() => setRenderMovies(searchResult), [searchResult]);

  useEffect(() => {
    if (!isSavedView) setCurrentKeyword(localStorage.keyword ? localStorage.keyword : '');
    else setCurrentKeyword('');
  }, [isSavedView, localStorage.keyword]);

  useEffect(() => {
    const filterFlag = () => {
      if (!isSavedView) return localStorage.filter ? JSON.parse(localStorage.filter) : false;
      return localStorage.savedFilter ? JSON.parse(localStorage.savedFilter) : false;
    };
    filterHandler(filterFlag());
  }, [localStorage.filter, localStorage.savedFilter, filterHandler, isSavedView]);

  useEffect(() => {
    const fetchMovies = async () => getMovies();
    fetchMovies();
  }, [isSavedView, getMovies]);

  return (
    <>
      <Header />
      <main className='movies'>
        {showLoader ? (
          <div className='movies__preloader-container'>
            <Preloader />
          </div>
        ) : (
          <>
            {allMovies.length ? (
              <SearchBar
                onFilter={filterHandler}
                onSearch={searchHandler}
                isSavedView={isSavedView}
              />
            ) : (
              <></>
            )}
            <MoviesList
              filteredMovies={renderMovies}
              savedMovies={savedMovies}
              isSavedView={isSavedView}
              keyword={currentKeyword}
              onSave={saveMovieHandler}
              onDelete={deleteMovieHandler}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};
