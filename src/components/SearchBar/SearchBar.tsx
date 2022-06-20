import { FormEvent, useState } from 'react';
import './SearchBar.css';

export const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFilter, setIsFilter] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSubmitHandler = () => {};

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
    if (target.checkValidity()) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  };

  const handleSwitch = () => setIsFilter(!isFilter);

  return (
    <section className='search'>
      <form name='search' className='search__form' onSubmit={formSubmitHandler}>
        <input
          type='text'
          className='search__input'
          name='searchInput'
          value={inputValue}
          onChange={handleInput}
          placeholder='Фильм'
          required
        />
        <button type='submit' className='search__button' disabled={isButtonDisabled}>
          Найти
        </button>
      </form>
      <div className='filter'>
        <span
          className={isFilter ? 'filter__switch filter__switch_selected' : 'filter__switch'}
          onClick={handleSwitch}
        />
        <p className='filter__label'>Короткометражки</p>
      </div>
    </section>
  );
};
