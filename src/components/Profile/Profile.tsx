import { ProfileProps } from './Profile.types';
import './Profile.css';
import { Header } from '../Header/Header';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export const Profile: React.FC<ProfileProps> = ({ onSubmit, onLogout }) => {
  // States
  const currentUser = useContext(CurrentUserContext);

  const [email, setEmail] = useState(currentUser.email);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailValidationMsg, setEmailValidationMsg] = useState('');

  const [name, setName] = useState(currentUser.name);
  const [isNameValid, setIsNameValid] = useState(true);
  const [nameValidationMsg, setNameValidationMsg] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const [isButtonHidden, setIsButtonHidden] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  // Effects
  useEffect(() => {
    if (isFormValid) setIsButtonHidden(false);
    else setIsButtonHidden(true);
  }, [isFormValid]);

  // Handlers
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const form: HTMLFormElement | null = document.querySelector('.form');

    const target = e.target as HTMLInputElement;
    if (target.name === 'email') {
      setEmail(target.value);
      setIsEmailValid(target.checkValidity());
      setEmailValidationMsg(target.validationMessage);
      if (target.value !== currentUser.email) setIsFormValid(form!.reportValidity());
      else setIsFormValid(false);
    }
    if (target.name === 'name') {
      setName(target.value);
      setIsNameValid(target.checkValidity());
      setNameValidationMsg(target.validationMessage);
      if (target.value !== currentUser.name) setIsFormValid(form!.reportValidity());
      else setIsFormValid(false);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    if (errorMsg.length) setErrorMsg('');
    try {
      await onSubmit({ name, email });
      setIsButtonHidden(true);
    } catch (error) {
      setErrorMsg('Что-то пошло не так...');
      setIsButtonHidden(false);
    } finally {
      setIsDisabled(false);
    }
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
              disabled={isDisabled}
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
              disabled={isDisabled}
            />
          </div>

          {isEmailValid ?? !emailValidationMsg.length ? (
            <></>
          ) : (
            <span className='form__error'>{emailValidationMsg}</span>
          )}
          {errorMsg.length ? <span className='form__error'>{errorMsg}</span> : <></>}
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
            disabled={isDisabled}
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
