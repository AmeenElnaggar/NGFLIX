import { Component, inject, OnInit, signal } from '@angular/core';
import { TvShowsService } from '../../../../Shared/services/tvShows.service';
import { TvShows } from '../../../../Shared/interfaces/tvshows.model';
import { MovieCardItemComponent } from '../../../../Shared/components/movie-card-item/movie-card-item.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-tv-list',
  standalone: true,
  imports: [MovieCardItemComponent, PaginatorModule, InputTextModule],
  templateUrl: './tv-list.component.html',
  styleUrl: './tv-list.component.scss',
})
export class TvListComponent implements OnInit {
  private tvShowsService = inject(TvShowsService);

  enterdInputSearch = signal<string>('');
  tvShowsList = signal<TvShows>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  isFetching = signal(true);
  error = signal<string>('');

  ngOnInit() {
    this.getSearchPage(1);
  }

  getSearchPage(page: number, enterdSearchValue?: string) {
    this.tvShowsService.searchTvShows(page, enterdSearchValue).subscribe({
      next: (response) => this.tvShowsList.set(response),
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false),
    });
  }

  onSearchTvShowChanges() {
    this.getSearchPage(1, this.enterdInputSearch());
  }

  onPageChangesFromPagnation(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;
    this.getSearchPage(pageNumber, this.enterdInputSearch());
  }
}
