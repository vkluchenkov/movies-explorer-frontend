import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../images/logo.svg';
import { LoginPayload } from '../../../types/payloads';
import '../AuthForms.css';

interface LoginProps {
  onLogin: (payload: LoginPayload) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailValidationMsg, setEmailValidationMsg] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordValidationMsg, setPasswordValidationMsg] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (isEmailValid && isPasswordValid) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }, [isEmailValid, isPasswordValid]);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
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

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin({ email, password });
  };

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
        />
        {isPasswordValid ?? !passwordValidationMsg.length ? (
          <></>
        ) : (
          <span className='authform__error'>{passwordValidationMsg}</span>
        )}
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
