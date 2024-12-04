import { Component, input } from '@angular/core';
import { FixedNumberPipe } from '../../pipes/fixed-number.pipe';
import { Movie } from '../../interfaces/movies.model';
import { RouterLink } from '@angular/router';
import { IMAGE_BASE_URL } from '../../Constans/image-details';

@Component({
  selector: 'app-movie-card-item',
  standalone: true,
  imports: [FixedNumberPipe, RouterLink],
  templateUrl: './movie-card-item.component.html',
  styleUrl: './movie-card-item.component.scss',
})
export class MovieCardItemComponent {
  movie = input.required<Movie>();

  get imagePath() {
    if (this.movie().backdrop_path) {
      return `${IMAGE_BASE_URL}/w500${this.movie().poster_path}`;
    }
    return `images/actor.jpg`;
  }
}
