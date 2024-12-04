export interface TvShow {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  title: string;
  original_title: string;
}

export interface TvShows {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}
