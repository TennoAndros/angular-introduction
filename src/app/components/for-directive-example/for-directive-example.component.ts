import { Component } from '@angular/core';
import { Person } from 'src/app/shared/interfaces/person';
import { PersonTableComponent } from '../person-table/person-table.component';

@Component({
  selector: 'app-for-directive-example',
  standalone: true,
  imports: [PersonTableComponent],
  templateUrl: './for-directive-example.component.html',
  styleUrl: './for-directive-example.component.css',
})
export class ForDirectiveExampleComponent {
  users: Person[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      email: 'john.doe@example.com',
      address: '123 Main St',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      age: 28,
      email: 'jane.doe@example.com',
      address: '123 Main St',
    },
    {
      firstName: 'Jim',
      lastName: 'Brown',
      age: 45,
      email: 'jim.brown@example.com',
      address: '456 Park Ave',
    },
    {
      firstName: 'Jill',
      lastName: 'Brown',
      age: 42,
      email: 'jill.brown@example.com',
      address: '456 Park Ave',
    },
    {
      firstName: 'Jake',
      lastName: 'Smith',
      age: 36,
      email: 'jake.smith@example.com',
      address: '789 Broadway',
    },
    {
      firstName: 'Judy',
      lastName: 'Smith',
      age: 34,
      email: 'judy.smith@example.com',
      address: '789 Broadway',
    },
    {
      firstName: 'Jack',
      lastName: 'Johnson',
      age: 50,
      email: 'jack.johnson@example.com',
      address: '321 Oak St',
    },
    {
      firstName: 'Julie',
      lastName: 'Johnson',
      age: 48,
      email: 'julie.johnson@example.com',
      address: '321 Oak St',
    },
    {
      firstName: 'Jerry',
      lastName: 'Davis',
      age: 55,
      email: 'jerry.davis@example.com',
      address: '654 Pine St',
    },
    {
      firstName: 'June',
      lastName: 'Davis',
      age: 53,
      email: 'june.davis@example.com',
      address: '654 Pine St',
    },
  ];
}
