import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TvListComponent } from '../../components/tv-list/tv-list.component';

@Component({
  selector: 'app-tv-show',
  standalone: true,
  imports: [TvListComponent],
  templateUrl: './tv-show.component.html',
  styleUrl: './tv-show.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowComponent {}
