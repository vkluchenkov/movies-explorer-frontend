import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { MoviesList } from '../MoviesList/MoviesList';
import { SearchBar } from '../SearchBar/SearchBar';
import { movies } from '../../mocks/movies';
import './Movies.css';

export const Movies: React.FC = () => {
  return (
    <>
      <Header />
      <main className='movies'>
        <SearchBar />
        <MoviesList movies={movies} />
      </main>
      <Footer />
    </>
  );
};
