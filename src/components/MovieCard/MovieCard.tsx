import { MovieCardProps } from './MovieCard.types';
import './MovieCard.css';
import { useState } from 'react';

export const MovieCard: React.FC<MovieCardProps> = ({ movie, isSaved, isSavedView }) => {
  const [saved, setSaved] = useState(isSaved);

  const saveClickHandler = () => setSaved(!saved);

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
    <li className='movie-card'>
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
        <button type='button' className='movie-card__button movie-card__button_delete' />
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
    </li>
  );
};
