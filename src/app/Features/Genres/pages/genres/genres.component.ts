import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GenresListComponent } from '../../components/genres-list/genres-list.component';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [GenresListComponent],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresComponent {}
