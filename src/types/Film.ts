interface FilmImageFormat {
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: any | null;
  url: string;
}

interface FilmImageFormats {
  thumbnail?: FilmImageFormat;
  large?: FilmImageFormat;
  medium?: FilmImageFormat;
  small?: FilmImageFormat;
}

interface FilmImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: FilmImageFormats;
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

export interface Film {
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
  image: FilmImage;
}
