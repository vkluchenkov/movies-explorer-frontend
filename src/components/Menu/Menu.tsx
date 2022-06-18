import { Link } from 'react-router-dom';
import './Menu.css';

export const Menu: React.FC = () => (
  <nav className='menu'>
    <ul className='menu__items'>
      <li className='menu__item'>
        <Link to='/movies'>Фильмы</Link>
      </li>
      <li className='menu__item'>
        <Link to='/saved-movies'>Сохраненные фильмы</Link>
      </li>
      <li className='menu__item menu__item_account'>
        <Link to='/profile'>Аккаунт</Link>
      </li>
    </ul>
  </nav>
);
