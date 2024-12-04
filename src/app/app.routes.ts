import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Features/Home/pages/home-page/home-page.component').then(
        (mod) => mod.HomePageComponent
      ),
  },
  {
    path: 'details/:movieId',
    loadComponent: () =>
      import(
        './Shared/pages/show-movie-details/show-movie-details.component'
      ).then((mod) => mod.ShowMovieDetailsComponent),
  },
  {
    path: 'movies-list',
    loadComponent: () =>
      import('./Features/Movies/pages/movies-list/movies-list.component').then(
        (mod) => mod.MoviesListComponent
      ),
  },
  {
    path: 'tv-show',
    loadComponent: () =>
      import('./Features/Tv-Shows/components/tv-list/tv-list.component').then(
        (mod) => mod.TvListComponent
      ),
  },
  {
    path: 'genres/:genreId',
    loadComponent: () =>
      import('./Features/Genres/pages/genres/genres.component').then(
        (mod) => mod.GenresComponent
      ),
  },
  {
    path: 'genres',
    loadComponent: () =>
      import('./Features/Genres/pages/genres/genres.component').then(
        (mod) => mod.GenresComponent
      ),
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
