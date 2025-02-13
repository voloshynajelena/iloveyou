import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeartsComponent } from './components/hearts/hearts.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeartsComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
