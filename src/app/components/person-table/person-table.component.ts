import { Component } from '@angular/core';

@Component({
  selector: 'app-person-table',
  standalone: true,
  imports: [],
  templateUrl: './person-table.component.html',
  styleUrl: './person-table.component.css',
})
export class PersonTableComponent {
  person = {
    firstName: 'Andy',
    lastName: 'Atos',
    age: 0x21,
    email: 'andy@something.gr',
  };
}
