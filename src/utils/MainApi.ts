import { MovieDto } from '../types/Movie';
import { LoginPayload, MoviePayload, SignupPayload, UpdateMePayload } from '../types/payloads';
import { User } from '../types/User';

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
    this._resHandler = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

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

  getMovies = async (): Promise<MovieDto[]> => {
    const res = await fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: 'include',
    });
    return this._resHandler(res);
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
  baseUrl: 'http://localhost:3005',
  headers: { 'Content-Type': 'application/json' },
});
