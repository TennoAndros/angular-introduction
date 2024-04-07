import { Routes } from '@angular/router';
import { EventBindExampleComponent } from './components/event-bind-example/event-bind-example.component';
import { WelcomeComponentComponent } from './components/welcome-component/welcome-component.component';

export const routes: Routes = [
  { path: 'event-bind-example', component: EventBindExampleComponent },
  { path: 'welcome', component: WelcomeComponentComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];
