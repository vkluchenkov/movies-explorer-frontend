import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { Button } from '../../ui-kit/Button/Button';
import './AuthPage.css';
import { AuthContent, AuthPageProps } from './AuthPage.types';

export const AuthPage: React.FC<AuthPageProps> = ({ type }) => {
  const content = (): AuthContent =>
    type === 'signin'
      ? {
          title: 'Рады видеть!',
          buttonText: 'Войти',
          hint: 'Ещё не зарегистрированы?',
          link: '/signup',
          linkText: ' Регистрация',
        }
      : {
          title: 'Добро пожаловать!',
          buttonText: 'Зарегистрироваться',
          hint: 'Уже зарегистрированы?',
          link: '/signin',
          linkText: ' Войти',
        };

  return (
    <section className='auth'>
      <Logo className='auth_logo' />
      <h1 className='auth_title'>{content().title}</h1>
      <div className='auth_actions'>
        <Button text={content().buttonText} />
        <p className='auth_actions__hint'>
          {content().hint}
          <Link to={content().link} className='auth_actions__link'>
            {content().linkText}
          </Link>
        </p>
      </div>
    </section>
  );
};
