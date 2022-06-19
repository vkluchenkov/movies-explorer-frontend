import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { MoviesList } from '../MoviesList/MoviesList';
import { SearchBar } from '../SearchBar/SearchBar';
import { movies } from '../../mocks/movies';
import './Movies.css';
import { MoviesProps } from './Movies.types';

export const Movies: React.FC<MoviesProps> = ({ isSavedView }) => {
  return (
    <>
      <Header />
      <main className='movies'>
        <SearchBar />
        <MoviesList movies={movies} isSavedView={isSavedView} />
      </main>
      <Footer />
    </>
  );
};
