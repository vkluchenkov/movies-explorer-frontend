import { FormEvent, useEffect, useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onFilter: (isFilter: boolean) => void;
  onSearch: (keyword: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onFilter, onSearch }) => {
  const localStorage = window.localStorage;

  const [inputValue, setInputValue] = useState(localStorage.keyword ? localStorage.keyword : '');
  const [isFilter, setIsFilter] = useState(localStorage.filter ? localStorage.filter : false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
    if (target.checkValidity()) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  };

  const handleSwitch = () => {
    setIsFilter(!isFilter);
    localStorage.setItem('filter', JSON.stringify(!isFilter));
    onFilter(!isFilter);
  };

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
