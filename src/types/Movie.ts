interface MovieImageFormat {
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: any | null;
  url: string;
}

interface MovieImageFormats {
  thumbnail: MovieImageFormat;
  large?: MovieImageFormat;
  medium?: MovieImageFormat;
  small?: MovieImageFormat;
}

interface MovieImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: MovieImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  created_at: string;
  updated_at: string;
}

export interface Movie {
  id: number;
  nameRU: string;
  nameEN: string | null;
  director: string | null;
  country: string | null;
  year: string;
  duration: number;
  description: string;
  trailerLink: string | null;
  created_at: string;
  updated_at: string;
  image: MovieImage;
}
export interface MovieDto {
  movieId: number;
  nameRU: string;
  nameEN: string;
  director: string;
  country: string;
  year: number;
  duration: number;
  description: string;
  trailerLink: string;
  image: string;
  thumbnail: string;
  owner: string;
}
