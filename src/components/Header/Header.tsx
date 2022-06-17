import './Header.css';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isLanding?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isLanding }) => {
  return (
    <header className={isLanding ? 'header header__landing' : 'header'}>
      <Logo className='header__logo' />
      <div className='header__actions'>
        <Link to='signup' className='header__signup-link'>
          Регистрация
        </Link>
        <Link to='/signin' className='header__signin-link'>
          Войти
        </Link>
      </div>
    </header>
  );
};
