import { Component } from '@angular/core';
import { PersonTableComponent } from './components/person-table/person-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  name = 'Andy';
  person0 = {
    firstName: 'Andy',
    lastName: 'Atos',
    age: 0x21,
    email: 'andy@something.gr',
    address: 'somewhere, Greece',
  };
  person1 = {
    firstName: 'Triss',
    lastName: 'Merigold',
    age: 0x19,
    email: 'triss@something.gr',
    address: 'somewhere, Greece',
  };
}
