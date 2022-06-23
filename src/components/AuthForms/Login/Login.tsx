import { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { ReactComponent as Logo } from '../../../images/logo.svg';
import '../AuthForms.css';
import { LoginProps } from './Login.types';

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const currentUser = useContext(CurrentUserContext);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailValidationMsg, setEmailValidationMsg] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordValidationMsg, setPasswordValidationMsg] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [errorMsg, setIsErrorMsg] = useState('');

  useEffect(() => {
    if (isEmailValid && isPasswordValid) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }, [isEmailValid, isPasswordValid]);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setIsErrorMsg('');
    const target = e.target as HTMLInputElement;
    if (target.name === 'email') {
      setEmail(target.value);
      setIsEmailValid(target.checkValidity());
      setEmailValidationMsg(target.validationMessage);
    }
    if (target.name === 'password') {
      setPassword(target.value);
      setIsPasswordValid(target.checkValidity());
      setPasswordValidationMsg(target.validationMessage);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    if (errorMsg.length) setIsErrorMsg('');
    setIsFormDisabled(true);
    setIsButtonDisabled(true);
    e.preventDefault();
    try {
      await onLogin({ email, password });
    } catch (error) {
      setIsErrorMsg('Что-то пошло не так...');
    } finally {
      setIsButtonDisabled(false);
      setIsFormDisabled(false);
    }
  };
  if (currentUser.isLoggedIn) return <Navigate to='/' />;
  return (
    <section className='auth'>
      <Link to='/' className='auth__logo'>
        <Logo />
      </Link>
      <h1 className='auth__title'>Рады видеть!</h1>
      <form className='authform' id='authform' onSubmit={submitHandler}>
        <label htmlFor='email' className='authform__label'>
          E-mail
        </label>
        <input
          type='email'
          className='authform__input'
          name='email'
          placeholder='email@example.com'
          required
          minLength={2}
          maxLength={40}
          onChange={handleChange}
          value={email || ''}
          disabled={isFormDisabled}
        />
        {isEmailValid ?? !emailValidationMsg.length ? (
          <></>
        ) : (
          <span className='authform__error'>{emailValidationMsg}</span>
        )}
        <label htmlFor='password' className='authform__label'>
          Пароль
        </label>
        <input
          type='password'
          className='authform__input'
          name='password'
          required
          onChange={handleChange}
          value={password || ''}
          disabled={isFormDisabled}
        />

        <span className='authform__error'>
          {errorMsg.length ? errorMsg : passwordValidationMsg}
        </span>
      </form>

      <div className='auth__actions'>
        <button
          type='submit'
          className='auth__actions_button'
          disabled={isButtonDisabled}
          form='authform'
        >
          Войти
        </button>
        <p className='auth__actions_hint'>
          Ещё не зарегистрированы?{' '}
          <Link to='/signup' className='auth__actions_link'>
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
};
