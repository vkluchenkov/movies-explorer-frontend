import { Link } from 'react-router-dom';
import './MobileMenu.css';
import { MobileMenuProps } from './MobileMenu.types';
import { ReactComponent as CloseButton } from '../../images/close.svg';

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => (
  <nav className={isOpen ? 'mobile-menu mobile-menu_open' : 'mobile-menu'}>
    <ul className='mobile-menu__items'>
      <li className='mobile-menu__item'>
        <Link to='/'>Главная</Link>
      </li>
      <li className='mobile-menu__item mobile-menu__item_active'>
        <Link to='/movies'>Фильмы</Link>
      </li>
      <li className='mobile-menu__item'>
        <Link to='/saved-movies'>Сохраненные фильмы</Link>
      </li>
      <li className='mobile-menu__item mobile-menu__item_account'>
        <Link to='/profile'>Аккаунт</Link>
      </li>
    </ul>
    <CloseButton className='mobile-menu__close' onClick={onClose} />
  </nav>
);
