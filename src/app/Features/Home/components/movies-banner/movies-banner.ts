import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieCardItemComponent } from '../../../../Shared/components/movie-card-item/movie-card-item.component';
import { MoviesService } from '../../../../Shared/services/movies.service';
import { Movie } from '../../../../Shared/interfaces/movies.model';
import { TvShowsService } from '../../../../Shared/services/tvShows.service';

@Component({
  selector: 'app-movies-banner',
  standalone: true,
  imports: [MovieCardItemComponent],
  templateUrl: './movies-banner.html',
  styleUrl: './movies-banner.scss',
})
export class MoviesBannerComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private tvShowService = inject(TvShowsService);

  upcomingMovies = signal<Movie[]>([]);
  topRatedMovies = signal<Movie[]>([]);
  tvShowsMovies = signal<Movie[]>([]);

  error = signal<string>('');
  isFetching = signal<boolean>(true);

  ngOnInit() {
    this.moviesService.getMoviesByType('popular').subscribe({
      next: (results) => this.moviesService.setPopularMovies(results),
    });
    this.moviesService.getMoviesByType('upcoming', 12).subscribe({
      next: (results) => this.upcomingMovies.set(results),
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false),
    });

    this.moviesService.getMoviesByType('top_rated', 12).subscribe({
      next: (results) => this.topRatedMovies.set(results),
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false),
    });

    this.tvShowService.getTvShowsByType('popular', 12).subscribe({
      next: (results) => this.tvShowsMovies.set(results),
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false),
    });
  }
}
