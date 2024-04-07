import { Routes } from '@angular/router';
import { EventBindExampleComponent } from './components/event-bind-example/event-bind-example.component';
import { WelcomeComponentComponent } from './components/welcome-component/welcome-component.component';
import { ComponentInputExampleComponent } from './components/component-input-example/component-input-example.component';
import { ForDirectiveExampleComponent } from './components/for-directive-example/for-directive-example.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponentComponent },
  {
    path: 'component-input-example',
    component: ComponentInputExampleComponent,
  },
  { path: 'for-directive-example', component: ForDirectiveExampleComponent },
  { path: 'event-bind-example', component: EventBindExampleComponent },
];
