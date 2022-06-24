import { MovieCardProps } from './MovieCard.types';
import './MovieCard.css';
import React, { useEffect, useState } from 'react';
import { MoviePayload } from '../../types/payloads';

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isSaved,
  isSavedView,
  onSave,
  onDelete,
}) => {
  const [saved, setSaved] = useState(isSaved);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
  }, [isError]);

  const deleteHandler = async () => {
    try {
      await onDelete(movie.id);
      setSaved(!saved);
    } catch (error) {
      setIsError(true);
    }
  };

  const saveClickHandler = async () => {
    if (!isSaved) {
      const url = 'https://api.nomoreparties.co';
      const payload: MoviePayload = {
        country: movie.country ? movie.country : 'unknown',
        director: movie.director ? movie.director : 'unknown',
        duration: movie.duration,
        year: movie.year ? movie.year : 'none',
        description: 'none',
        image: url + movie.image.url,
        trailerLink: movie.trailerLink ? movie.trailerLink : 'https://yandex.ru',
        thumbnail: movie.image.formats?.thumbnail?.url
          ? url + movie.image.formats?.thumbnail?.url
          : 'https://yandex.ru',
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN ? movie.nameEN : '',
      };
      try {
        await onSave(payload);
        setSaved(!saved);
      } catch (error) {
        setIsError(true);
      }
    } else await deleteHandler();
  };

  const cardClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const url = movie.trailerLink
      ? movie.trailerLink
      : `https://yandex.ru/search/?text=${movie.nameRU}`;

    if (!target.classList.contains('movie-card__button')) window.open(url, '_blank')!.focus();
  };

  const duration = () => {
    if (movie.duration <= 59) {
      return movie.duration + ' м';
    }
    if (movie.duration >= 60) {
      const hours = Math.floor(movie.duration / 60);
      const minutes = movie.duration % 60;
      return hours + 'ч ' + minutes + 'м';
    }
  };

  return (
    <li className='movie-card' onClick={cardClickHandler}>
      <img
        className='movie-card__image'
        alt={movie.nameRU}
        src={`https://api.nomoreparties.co/${movie.image.url}`}
      />
      <div className='movie-card__info'>
        <h2 className='movie-card__name'>{movie.nameRU}</h2>
        <p className='movie-card__duration'>{duration()}</p>
      </div>
      {isSavedView ? (
        <button
          type='button'
          className='movie-card__button movie-card__button_delete'
          onClick={deleteHandler}
        />
      ) : (
        <button
          type='button'
          className={
            saved
              ? 'movie-card__button movie-card__button_like_active'
              : 'movie-card__button movie-card__button_like'
          }
          onClick={saveClickHandler}
        />
      )}
      {isError ? <span className='movie-card__error'>Что-то пошло не так... </span> : <></>}
    </li>
  );
};
