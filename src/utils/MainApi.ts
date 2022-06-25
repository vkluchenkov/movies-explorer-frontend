import { Movie, MovieDto } from '../types/Movie';
import { LoginPayload, MoviePayload, SignupPayload, UpdateMePayload } from '../types/payloads';
import { User } from '../types/User';
import { MAIN_URL } from './config';

interface SignoutDto {
  message: string;
}

class MainApi {
  _baseUrl: string;
  _headers: HeadersInit;
  _resHandler: (res: Response) => Promise<any>;

  constructor(options: any) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._resHandler = (res) =>
      res.ok ? res.json() : Promise.reject({ status: res.status, message: res.json() });
  }

  _dtoToMovie = async (dto: Promise<MovieDto[]>): Promise<Movie[]> => {
    const res = await dto;
    return res.map((m) => {
      const imageUrl = m.image.replace('https://api.nomoreparties.co/', '');
      return {
        id: m.movieId,
        nameRU: m.nameRU,
        nameEN: m.nameEN,
        director: m.director,
        country: m.country,
        year: m.year,
        duration: m.duration,
        description: m.description,
        trailerLink: m.trailerLink,
        image: {
          url: imageUrl,
        },
      };
    });
  };

  getMe = async (): Promise<User> => {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    });
    return this._resHandler(res);
  };

  patchMe = async (payload: UpdateMePayload): Promise<User> => {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    return this._resHandler(res);
  };

  signup = async (payload: SignupPayload): Promise<User> => {
    const res = await fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return this._resHandler(res);
  };

  signin = async (payload: LoginPayload): Promise<User> => {
    const res = await fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return this._resHandler(res);
  };

  signout = async (): Promise<SignoutDto> => {
    const res = await fetch(`${this._baseUrl}/signout`, {
      headers: this._headers,
      credentials: 'include',
    });
    return this._resHandler(res);
  };

  getMovies = async (): Promise<Movie[]> => {
    const res = await fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: 'include',
    });
    const data: Promise<MovieDto[]> | null = res.ok ? res.json() : null;
    return data ? this._dtoToMovie(data) : Promise.reject(`Ошибка: ${res.status}`);
  };

  addMovie = async (payload: MoviePayload): Promise<MovieDto> => {
    const res = await fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return this._resHandler(res);
  };

  deleteMovie = async (movieId: number): Promise<any> => {
    const res = await fetch(`${this._baseUrl}/movies/${movieId}`, {
      headers: this._headers,
      credentials: 'include',
      method: 'DELETE',
    });
    return this._resHandler(res);
  };
}

export const mainApi = new MainApi({
  baseUrl: MAIN_URL,
  headers: { 'Content-Type': 'application/json' },
});
