import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { SliderComponent } from '../../components/slider/slider.component';
import { TabViewModule } from 'primeng/tabview';
import { IMAGE_SIZE } from '../../Constans/image-details';
import { Movie } from '../../interfaces/movies.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Video } from '../../interfaces/video.model';
import { VideoEmbedComponent } from '../../components/video-embed/video-embed.component';
import { Photo } from '../../interfaces/photo.model';
import { ImageModule } from 'primeng/image';
import { Actor } from '../../interfaces/credits.model';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-show-movie-details',
  standalone: true,
  imports: [
    TabViewModule,
    ImageModule,
    CarouselModule,
    SliderComponent,
    VideoEmbedComponent,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './show-movie-details.component.html',
  styleUrl: './show-movie-details.component.scss',
})
export class ShowMovieDetailsComponent implements OnInit {
  private moviesService = inject(MoviesService);
  movieId = input.required<string>();

  movie = signal<Movie[]>([]);
  videos = signal<Video[]>([]);
  photos = signal<Photo[]>([]);
  actors = signal<Actor[]>([]);
  erorr = signal<string>('');
  isFetching = signal<boolean>(true);
  imageSize = IMAGE_SIZE;

  ngOnInit() {
    this.moviesService.getMovieById(this.movieId()).subscribe({
      next: (response) => this.movie.set([response]),
      error: (error: Error) => this.erorr.set(error.message),
      complete: () => this.isFetching.set(false),
    });
    this.moviesService.getMoviesVideos(this.movieId()).subscribe({
      next: (results) => this.videos.set(results),
    });
    this.moviesService.getMoviesPhotos(this.movieId()).subscribe({
      next: (results) => this.photos.set(results),
    });
    this.moviesService.getCreditsDetails(this.movieId()).subscribe({
      next: (res) => this.actors.set(res),
    });
  }

  get imageOfPosterPath() {
    return `${this.imageSize.medium}${this.movie()[0]?.poster_path}`;
  }
}
