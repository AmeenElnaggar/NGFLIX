import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchListComponent } from '../../components/search-list/search-list.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [SearchListComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent {}
