import { NavLink } from 'react-router-dom';
import './MobileMenu.css';
import { MobileMenuProps } from './MobileMenu.types';
import { ReactComponent as CloseButton } from '../../images/close.svg';

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => (
  <nav className={isOpen ? 'mobile-menu mobile-menu_open' : 'mobile-menu'}>
    <ul className='mobile-menu__items'>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'mobile-menu__item mobile-menu__item_active' : 'mobile-menu__item'
          }
          to='/'
          onClick={onClose}
        >
          Главная
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'mobile-menu__item mobile-menu__item_active' : 'mobile-menu__item'
          }
          to='/movies'
          onClick={onClose}
        >
          Фильмы
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'mobile-menu__item mobile-menu__item_active' : 'mobile-menu__item'
          }
          to='/saved-movies'
          onClick={onClose}
        >
          Сохраненные фильмы
        </NavLink>
      </li>
      <li className='mobile-menu__item_account-wrapper'>
        <NavLink
          className='mobile-menu__item mobile-menu__item_account'
          to='/profile'
          onClick={onClose}
        >
          Аккаунт
        </NavLink>
      </li>
    </ul>
    <CloseButton className='mobile-menu__close' onClick={onClose} />
  </nav>
);
