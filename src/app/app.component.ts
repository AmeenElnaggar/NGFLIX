import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './Core/header/header.component';
import { FooterComponent } from './Core/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
})
export class AppComponent {
  title = 'Hello';
}
