import { Component } from '@angular/core';
import { Person } from 'src/app/shared/interfaces/person';
import { PersonTableComponent } from '../person-table/person-table.component';

@Component({
  selector: 'app-component-input-example',
  standalone: true,
  imports: [PersonTableComponent],
  templateUrl: './component-input-example.component.html',
  styleUrl: './component-input-example.component.css',
})
export class ComponentInputExampleComponent {
  person0: Person = {
    first_name: 'Andy',
    last_name: 'Atos',
    age: 0x21,
    email: 'andy@something.gr',
    address: 'somewhere, Greece',
  };
  person1: Person = {
    first_name: 'Triss',
    last_name: 'Merigold',
    age: 0x19,
    email: 'triss@something.gr',
    address: 'somewhere, Greece',
  };
}
