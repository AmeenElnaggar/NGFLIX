import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Genres, Movie, Movies } from '../interfaces/movies.model';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Videos } from '../interfaces/video.model';
import { Photos } from '../interfaces/photo.model';
import { Credits } from '../interfaces/credits.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private httpClient = inject(HttpClient);
  private api_key = '064339212eca470c949421101886fdc2';
  private apiUrl = 'https://api.themoviedb.org/3/';

  getMoviesByType(movieType: string, moviesCount: number = 20) {
    return this.httpClient
      .get<Movies>(`${this.apiUrl}movie/${movieType}?api_key=${this.api_key}`)
      .pipe(
        map((response) => response.results.slice(0, moviesCount)),
        catchError(() =>
          throwError(
            () =>
              new Error(
                'Something went wrong fetching the avaliable movies, please try again later.'
              )
          )
        )
      );
  }

  getMovieById(movieId: string) {
    return this.httpClient
      .get<Movie>(`${this.apiUrl}movie/${movieId}?api_key=${this.api_key}`)
      .pipe(
        catchError(() =>
          throwError(
            () =>
              new Error(
                'Something went wrong fetching the selected movie , please try again later.'
              )
          )
        )
      );
  }

  getMoviesVideos(movieId: string) {
    return this.httpClient
      .get<Videos>(
        `${this.apiUrl}movie/${movieId}/videos?api_key=${this.api_key}`
      )
      .pipe(map((response) => response.results));
  }

  getMoviesPhotos(movieId: string) {
    return this.httpClient
      .get<Photos>(
        `${this.apiUrl}movie/${movieId}/images?api_key=${this.api_key}`
      )
      .pipe(map((result) => result.posters));
  }

  getCreditsDetails(movieId: string) {
    return this.httpClient
      .get<Credits>(
        `${this.apiUrl}movie/${movieId}/credits?api_key=${this.api_key}`
      )
      .pipe(map((results) => results.cast));
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? 'search/movie' : 'movie/upcoming';
    return this.httpClient.get<Movies>(
      `${this.apiUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.api_key}`
    );
  }

  popularMovies = new BehaviorSubject<Movie[]>([]);

  setPopularMovies(movies: Movie[]) {
    this.popularMovies.next(movies);
  }

  getPopularMoviesObservable() {
    return this.popularMovies.asObservable();
  }

  getGenresList() {
    return this.httpClient
      .get<Genres>(`${this.apiUrl}genre/movie/list?api_key=${this.api_key}`)
      .pipe(
        map((response) => response.genres),
        catchError(() =>
          throwError(
            () =>
              new Error(
                'Something went wrong fetching the avaliable genres, please try again later.'
              )
          )
        )
      );
  }

  getMoviesByGenre(genreId: number, pageNumber: number = 1) {
    return this.httpClient.get<Movies>(
      `${this.apiUrl}discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.api_key}&`
    );
  }
}
