import { ProfileProps } from './Profile.types';
import './Profile.css';
import { Header } from '../Header/Header';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export const Profile: React.FC<ProfileProps> = ({ onSubmit, onLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState(currentUser.email);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailValidationMsg, setEmailValidationMsg] = useState('');

  const [name, setName] = useState(currentUser.name);
  const [isNameValid, setIsNameValid] = useState(true);
  const [nameValidationMsg, setNameValidationMsg] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const [isButtonHidden, setIsButtonHidden] = useState(true);

  useEffect(() => {
    if (isFormValid) setIsButtonHidden(false);
    else setIsButtonHidden(true);
  }, [isFormValid]);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const form: HTMLFormElement | null = document.querySelector('.form');

    if (form) setIsFormValid(form.reportValidity());

    const target = e.target as HTMLInputElement;
    if (target.name === 'email') {
      setEmail(target.value);
      setIsEmailValid(target.checkValidity());
      setEmailValidationMsg(target.validationMessage);
    }
    if (target.name === 'name') {
      setName(target.value);
      setIsNameValid(target.checkValidity());
      setNameValidationMsg(target.validationMessage);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <>
      <Header />
      <section className='profile'>
        <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
        <form name='profile' id='profile' onSubmit={submitHandler} className='form'>
          <div className='form__input-wrapper'>
            <label htmlFor='name' className='form__label'>
              Имя
            </label>
            <input
              type='text'
              className='form__input'
              name='name'
              required
              minLength={2}
              maxLength={40}
              onChange={handleInputChange}
              value={name}
            />
          </div>

          {isNameValid ?? !nameValidationMsg.length ? (
            <></>
          ) : (
            <span className='form__error'>{nameValidationMsg}</span>
          )}

          <div className='form__divider' />

          <div className='form__input-wrapper'>
            <label htmlFor='email' className='form__label'>
              E-mail
            </label>
            <input
              type='email'
              className='form__input'
              name='email'
              required
              onChange={handleInputChange}
              value={email}
            />
          </div>

          {isEmailValid ?? !emailValidationMsg.length ? (
            <></>
          ) : (
            <span className='form__error'>{emailValidationMsg}</span>
          )}
        </form>

        <div className='profile-actions'>
          <button
            type='submit'
            className={
              isButtonHidden
                ? 'profile-actions__button'
                : 'profile-actions__button profile-actions__button_visible'
            }
            form='profile'
          >
            Редактировать
          </button>
          <button
            type='button'
            className='profile-actions__button profile-actions__button_signout'
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </>
  );
};
