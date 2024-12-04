import { Component, inject, input, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '../../interfaces/video.model';

@Component({
  selector: 'app-video-embed',
  standalone: true,
  imports: [],
  templateUrl: './video-embed.component.html',
  styleUrl: './video-embed.component.scss',
})
export class VideoEmbedComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  video = input.required<Video>();

  videoUrl = signal<SafeResourceUrl>('');

  ngOnInit() {
    this.videoUrl.set(
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.video().key}?si=n3W-NeTWIr75Bv5S`
      )
    );
  }
}
