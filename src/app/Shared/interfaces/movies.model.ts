export interface Movie {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  revenue?: number;
  runtime?: number;
  status?: string;
  genres?: Genre[];
}

export interface Movies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  name: string;
  id: number;
}

export interface Genres {
  genres: Genre[];
}
