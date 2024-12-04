import { Component, inject, OnInit, signal } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { MovieCardItemComponent } from '../../../../Shared/components/movie-card-item/movie-card-item.component';
import { MoviesService } from '../../../../Shared/services/movies.service';
import { Movies } from '../../../../Shared/interfaces/movies.model';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [
    MovieCardItemComponent,
    InputTextModule,
    FormsModule,
    PaginatorModule,
  ],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss',
})
export class SearchListComponent implements OnInit {
  private moviesService = inject(MoviesService);

  searchList = signal<Movies>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  enterdInputSearch = signal<string>('');
  isFetching = signal(true);
  error = signal<string>('');

  ngOnInit() {
    this.getSearchPage(1);
  }

  getSearchPage(page: number, enterdSearchValue?: string) {
    this.moviesService.searchMovies(page, enterdSearchValue).subscribe({
      next: (results) => {
        return this.searchList.set(results);
      },
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false),
    });
  }

  onSearchMovieChanges() {
    this.getSearchPage(1, this.enterdInputSearch());
  }

  onPageChangesFromPagnation(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;
    this.getSearchPage(pageNumber, this.enterdInputSearch());
  }
}
