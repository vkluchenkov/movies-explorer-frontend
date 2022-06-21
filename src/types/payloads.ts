export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateMePayload {
  name: string;
  email: string;
}

export interface MoviePayload {
  country: string;
  director: string;
  duration: number;
  year: number;
  description: string;
  image: string;
  trailerLink: string;
  thumbnail: string;
  movieId: number;
  nameRU: string;
  nameEN: string;
}
