import { Component, inject, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../../../Shared/services/movies.service';
import { Genre, Movies } from '../../../../Shared/interfaces/movies.model';
import { MovieCardItemComponent } from '../../../../Shared/components/movie-card-item/movie-card-item.component';

import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-genres-list',
  standalone: true,
  imports: [MovieCardItemComponent, PaginatorModule],
  templateUrl: './genres-list.component.html',
  styleUrl: './genres-list.component.scss',
})
export class GenresListComponent implements OnInit {
  private moviesService = inject(MoviesService);

  genresList = signal<Genre[]>([]);
  moviesList = signal<Movies>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  ngOnInit(): void {
    this.moviesService.getGenresList().subscribe({
      next: (results) => this.genresList.set(results),
    });
  }

  findMoviesByGenre(genreId: number) {
    this.moviesService
      .getMoviesByGenre(genreId)
      .subscribe((data) => this.moviesList.set(data));
  }
}
