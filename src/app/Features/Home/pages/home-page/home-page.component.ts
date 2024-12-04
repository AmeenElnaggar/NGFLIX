import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MoviesBannerComponent } from '../../components/movies-banner/movies-banner';
import { SliderComponent } from '../../../../Shared/components/slider/slider.component';
import { MoviesService } from '../../../../Shared/services/movies.service';
import { Movie } from '../../../../Shared/interfaces/movies.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SliderComponent, MoviesBannerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private moviesService = inject(MoviesService);
  popularMovies = signal<Movie[]>([]);

  ngOnInit() {
    this.moviesService.getPopularMoviesObservable().subscribe((movies) => {
      this.popularMovies.set(movies);
    });
  }
}
