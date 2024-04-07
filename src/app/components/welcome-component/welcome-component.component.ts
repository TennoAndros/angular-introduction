import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-component',
  standalone: true,
  imports: [],
  templateUrl: './welcome-component.component.html',
  styleUrl: './welcome-component.component.css'
})
export class WelcomeComponentComponent {
  name = 'Andy';

}
