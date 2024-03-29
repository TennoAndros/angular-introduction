import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  name = 'Andy';

  person = {
    firstName: 'Andy',
    lastName: 'Atos',
    age: 0x21,
    email: 'andy@something.gr',
  };
}
