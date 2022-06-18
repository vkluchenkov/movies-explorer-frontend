import './Landing.css';
import { Header } from '../Header/Header';
import { Cover } from '../Cover/Cover';
import { Navbar } from '../Navbar/Navbar';
import { About } from '../About/About';
import { Tech } from '../Tech/Tech';
import { Student } from '../Student/Student';
import { Footer } from '../Footer/Footer';

export const Landing: React.FC = () => (
  <>
    <Header isLanding />
    <main className='landing'>
      <Cover />
      <Navbar />
      <About />
      <Tech />
      <Student />
    </main>
    <Footer />
  </>
);
