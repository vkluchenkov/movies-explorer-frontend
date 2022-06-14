import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className='not-found'>
      <h1 className='not-found_title'>404</h1>
      <p className='not-found_subtitle'>Страница не найдена</p>
      <Link to='#' className='not-found_link' onClick={() => navigate(-1)}>
        Назад
      </Link>
    </section>
  );
};
