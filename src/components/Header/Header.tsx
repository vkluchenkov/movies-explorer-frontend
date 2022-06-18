import './Header.css';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ReactComponent as MenuButton } from '../../images/burger-icon.svg';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { HeaderProps } from './Header.types';
import { Menu } from '../Menu/Menu';

export const Header: React.FC<HeaderProps> = ({ isLanding }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const menuOpen = () => setIsMenuOpen(true);
  const menuClose = () => setIsMenuOpen(false);

  // close mobile menu on window width above 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) menuClose();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={isLanding ? 'header header_landing' : 'header'}>
        <Link to='/'>
          <Logo className='header__logo' />
        </Link>
        {currentUser?.isLoggedIn ? (
          <>
            <MenuButton className='header__mobile-menu' onClick={menuOpen} />
            <Menu />
          </>
        ) : (
          <div className='header__actions'>
            <Link to='signup' className='header__signup-link'>
              Регистрация
            </Link>
            <Link to='/signin' className='header__signin-link'>
              Войти
            </Link>
          </div>
        )}
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={menuClose} />
    </>
  );
};
