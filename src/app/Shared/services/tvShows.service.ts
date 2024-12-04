import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { TvShows } from '../interfaces/tvshows.model';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  private httpClient = inject(HttpClient);
  private api_key = '064339212eca470c949421101886fdc2';
  private apiUrl = 'https://api.themoviedb.org/3/';

  getTvShowsByType(tvShowsType: string, tvShowsCount: number = 20) {
    return this.httpClient
      .get<TvShows>(`${this.apiUrl}tv/${tvShowsType}?api_key=${this.api_key}`)
      .pipe(
        map((response) =>
          response.results.map((tvShow) => {
            return {
              ...tvShow,
              title: tvShow.name,
              original_title: tvShow.original_name,
            };
          })
        )
      )
      .pipe(
        map((results) => results.slice(0, tvShowsCount)),
        catchError(() =>
          throwError(
            () =>
              new Error(
                'Something went wrong fetching the avaliable tv shows , please try again later.'
              )
          )
        )
      );
  }
  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? 'search/tv' : 'tv/popular';
    return this.httpClient.get<TvShows>(
      `${this.apiUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.api_key}`
    );
  }
}
