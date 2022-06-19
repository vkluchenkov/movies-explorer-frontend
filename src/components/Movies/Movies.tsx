import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { SearchBar } from '../SearchBar/SearchBar';
import './Movies.css';

export const Movies: React.FC = () => {
  return (
    <>
      <Header />
      <main className='movies'>
        <SearchBar />
      </main>
      <Footer />
    </>
  );
};
