import { Component, input, OnInit, signal } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { interval } from 'rxjs';
import { Movie } from '../../interfaces/movies.model';
import { IMAGE_BASE_URL } from './../../Constans/image-details';

@Component({
  selector: 'app-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  slides = input.required<Movie[]>();
  isHeader = input.required<boolean>();
  slideIndex = signal<number>(0);

  ngOnInit() {
    if (!this.isHeader()) {
      this.changeSlide();
    }
  }

  changeSlide() {
    interval(5000).subscribe(() => {
      this.slideIndex.set((this.slideIndex() + 1) % this.slides().length);
    });
  }

  movieImagePath(movie: Movie) {
    return `${IMAGE_BASE_URL}/w1280${movie.backdrop_path}`;
  }
};
