import { Movie } from '../types/Movie';

class MoviesApi {
  _baseUrl: string;
  _headers: HeadersInit;
  _resHandler: (res: Response) => Promise<any>;

  constructor(options: any) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._resHandler = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }
  getMovies = async (): Promise<Movie[]> => {
    const res = await fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    });
    return this._resHandler(res);
  };
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: { 'Content-Type': 'application/json' },
});
