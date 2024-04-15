# Introduction to Angular Framework

## Step 1: Preparation and Basic Actions

- Install Angular CLI

  ```bash
  npm install -g @angular/cli@latest
  ```

- Create a new Angular Project

  ```bash
  ng new angular-introduction --standalone --skip-tests
  ```

- Modifications in the `ts.config.json` file

  ```json
  {
  ...
  "compilerOptions": {
      ...
      "baseUrl": "./",
      "strict": false,
      ...
  }
  ...
  }
  ```

- Start the Angular Project

  ```bash
  ❯ ng serve
  Initial chunk files | Names         | Raw size
  polyfills.js        | polyfills     | 83.60 kB |
  main.js             | main          |  1.67 kB |
  styles.css          | styles        | 95 bytes |

                      | Initial total | 85.36 kB

  Application bundle generation complete. [1.241 seconds]

  Watch mode enabled. Watching for file changes...
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
  ```

- The application is available at `http://localhost:4200/`

- Create an online repository on GitHub (`angular-introduction`) and push the code

  ```bash
  git remote add origin git@github.com:christodoulos/angular-introduction.git
  git push -u origin main
  ```

- Create the repository `<username>.github.io` if it doesn't already exist.

- Add deployment capability to GitHub gh-pages

  ```bash
  ng add angular-cli-ghpages
  ```

- Add the _deploy_ script to the `package.json` file

  ```json
  {
  ...
  "scripts": {
      ...
      "deploy": "ng deploy --base-href=https://<username>.github.io/angular-introduction/"
  }
  ...
  }
  ```

- Deploy the application to GitHub gh-pages

  ```bash
  npm run deploy
  ```

- The application is available at `https://<username>.github.io/angular-introduction/`

- Enable GitHub Pages for the `<username>.github.io/angular-introduction` repository

- The application is available at `https://<username>.github.io/angular-introduction/`

- Install bootstrap

  ```bash
  npm install bootstrap
  ```

- Edit the `angular.json` file

  ```json
  {
  ...

  "styles": [
      "src/styles.css",
      "node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  ...
  }
  ```

- **Restart the Angular Project** after each change in the `angular.json` file, it is necessary to restart the Angular Project (^C and run `ng serve` again)

- Locally install `prettier` and create the `.prettierrc` file

  ```bash
  npm install --save-dev prettier
  ```

  ```json
  {
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "angular"
        }
      }
    ]
  }
  ```

## Step 2: Simple Property Binding (One Way Binding)

- Use the placeholder `{{ <attribute_name> }}` to bind the attribute `attribute_name` in the component template.
- If the class attribute is an object, use the syntax `{{ <object_name>.<attribute_name> }}`.

## Step 3: Creating a New Component

- Generate a new component using the command `ng generate component components/person-table`.
- Move the table from `app.component.html` to the template of the new component.
- Move the `person` attribute from the `AppComponent` class to the `PersonTableComponent` class.
- Include the `PersonTableComponent` in the `imports` array in the initialization of the decorator in the `app.component.ts` file.
- Use the new component in the `app.component.html` template with the tag `<app-person-table></app-person-table>`.

## Step 4: Component Input

- Create an interface for data of type `Person`

  ```bash
  ng generate interface shared/interfaces/person
  ```

  ```typescript
  export interface Person {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    address: string;
  }
  ```

- Use the `Person` interface as the type for the `person` attribute in the `PersonTableComponent` component.

- Use the `@Input()` decorator on the `person` attribute of type `Person` or `undefined` in the `PersonTableComponent` component.

- Use the `@if() {} @else {}` in the template of the `PersonTableComponent` component to conditionally display the data of the `person` attribute.

- Bind the attributes of the `AppComponent` class to the `person` attribute of the `PersonTableComponent` component in the template of the `AppComponent` component.

  ```html
  <app-person-table [person]="person0"></app-person-table>
  <!-- Without binding in the following -->
  <app-person-table></app-person-table>
  <app-person-table [person]="person1"></app-person-table>
  ```

## Step 5: @for Template Directive

- Define an attribute `people` of type `Person[]` in the `AppComponent` class (array of objects of type `Person`).
- Use the template directive `@for(obj of objects); track obj` to display the data of the `people` array using the `PersonTableComponent` component.

  ```html
  @for (user of users; track user) {
  <app-person-table [person]="user"></app-person-table>
  }
  ```

## Step 6: Event Binding

- Bind a method of the class (event handler) to the `event` event of the template using `(eventName)="onEventName($event)"`

  ```html
  <button (click)="onAddPerson()">Add Person</button>
  ```

- Use the `input` event from an HTML input element to read its value in the class and then pass it back to the template using simple binding with `{{ <attribute_name> }}`

  ```html
  <input type="text" (input)="onInput($event)" />
  ```

## Step 7: Routing

- Our goal is to make selections from the menu on the left, and the components will appear on the right side.
- Create the Welcome component, which will be displayed first when the application starts (it also uses a logo from `/assets`):

  ```bash
  ng g c welcome
  ```

- In the `app.routes.ts` file, the `routes` array contains objects that represent the paths displayed in the application menu along with the Angular component corresponding to each path.

  ```typescript
  import { Routes } from "@angular/router";
  import { EventBindExampleComponent } from "src/app/components/event-bind-example/event-bind-example.component";
  import { WelcomeComponent } from "./components/welcome/welcome.component";

  export const routes: Routes = [
    { path: "event-bind-example", component: EventBindExampleComponent },
    { path: "welcome", component: WelcomeComponent },
    { path: "", redirectTo: "/welcome", pathMatch: "full" },
  ];
  ```

- Already in the `app.config.ts` file, the routes directory passes to `provideRouter`:

  ```typescript
  import { ApplicationConfig } from "@angular/core";
  import { provideRouter } from "@angular/router";

  import { routes } from "./app.routes";

  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)],
  };
  ```

- The exact place in the template where components will be inserted is declared with the `<router-outlet></router-outlet>` tag:

  ```html
  ...
  <span class="flex-grow-1 p-2 text-nowrap">
    <router-outlet></router-outlet>
  </span>
  ...
  ```

- Flow example for a user selection:

  1. The user selects something from the menu, and in the HTML, the tag related to the selection includes the `routerLink` directive, e.g., in `app.component.html` the tag `<span role="button" routerLink="event-bind-example">Event Bind Example</span>`.
  2. Control is transferred to the `app.routes.ts` file where a search is made in the `routes` array to find the object that has a value in the `path` attribute equal to the value of the `routerLink` in the tag from step 1.
  3. The URL changes to the one corresponding to the path of the object from step 2.
  4. Within the `<router-outlet></router-outlet>` context, the component from the `path` attribute of the object from step 2 is displayed.

- Create the `ComponentInputExampleComponent` and `ForDirectiveExampleComponent` and add them to the application menu:

  1. Update the `app.routes.ts` file
  2. Update the menu HTML with the appropriate `routerLink` directives

## Step 8: Fancy App Menu with Bootstrap's [list-group](https://t.ly/vmYc2)

- Create a new interface `MenuItem` in the file `shared/interfaces/menu-item.ts`:

  ```typescript
  export interface MenuItem {
    text: string; // Text displayed in the menu
    routerLink: string; // Path corresponding to the component
  }
  ```

- Create the `ListGroupMenuComponent` component with the command:

  ```bash
  ng g c components/list-group-menu
  ```

- Our application menu is an array of objects `MenuEntry`:

  ```typescript
  menu: MenuEntry[] = [
    { text: 'Component Input Example', routerLink: 'component-input-example' },
    { text: '@for Directive Example', routerLink: 'for-directive-example' },
    { text: 'Event Bind Example', routerLink: 'event-bind-example' },
  ];
  ```

  ## Step 9: Simple Datatable

- Use https://cobbl.io/ to generate a table with multiple `EPerson` data defined in `/shared/interfaces/person.ts`:

  ```typescript
  export interface EPerson {
    firstName: string;
    lastName: string;
    age: string;
    email: string;
    address: string;
    education: string;
  }

  export const ManyPerson: EPerson[] = [
    {
      firstName: 'Sarah',
      lastName: 'Howard',
      age: '41',
      email: 's.m.howard@yahoo.com',
      education: 'Some college, no degree',
    },
    ...
    ]
  ```

- Create the `SimpleDataTableComponent`: takes `EPerson` data and displays it in a table with column sorting capability.
- Create the `SimpleDataTableExampleComponent`: utilizes the `SimpleDataTableComponent`.
- Update our application menu

  - `app.routes.ts`:

    ```typescript
    ...
    {
      path: 'simple-data-table-example',
      component: SimpleDatatableExampleComponent,
    }
    ...
    ```

  - `list-group-menu.component.ts`:

    ```typescript
    ...
    {
      text: 'Simple Data Table Example',
      routerLink: 'simple-data-table-example',
    }
    ...
    ```

- Install `lodash-es`:

  ```bash
  npm i lodash-es
  npm i --save-dev @types/lodash-es
  ```

  ## Step 10: Component Output

- Create the `ComponentOutputExampleComponent` and update our application menu (in `app.routes.ts` and `list-group-menu.component.ts`).
- Update the `SimpleDataTableComponent` to emit the selected row on double click.
  - Use the `@Output()` decorator on the `personClicked` attribute of type `EPerson` in the `SimpleDataTableComponent`.
  - The output is an `EventEmitter<T>` that carries data of type `<T>`.

## Step 11: Angular Material

- Install Angular Material and Angular CDK:

  ```bash
  ❯ ng add @angular/material
  ℹ Using package manager: npm
  ✔ Found compatible package version: @angular/material@17.3.2.
  ✔ Package information loaded.

  The package @angular/material@17.3.2 will be installed and executed.
  Would you like to proceed? Yes
  ✔ Packages successfully installed.
  ? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview:
  https://material.angular.io?theme=indigo-pink ]
  ? Set up global Angular Material typography styles? No
  ? Include the Angular animations module? Include and enable animations
  UPDATE package.json (1396 bytes)
  ✔ Packages installed successfully.
  UPDATE src/app/app.config.ts (338 bytes)
  UPDATE angular.json (3652 bytes)
  UPDATE src/index.html (516 bytes)
  UPDATE src/styles.css (181 bytes)
  ```

- Modify the `PersonTableComponent` to handle data either `Person` or `EPerson`.
- Modify the `ComponentOutputExampleComponent` and replace `alert` with Angular Material's `dialog` (https://t.ly/JLFka).

## Step 12: Template Driven Forms

- Create the `EpersonTemplateDrivenFormComponent` and `TemplateDrivenFormExampleComponent`.
- Update our application menu (in `app.routes.ts` and `list-group-menu.component.ts`).
- Intervene in the `SimpleDatatableComponent` for the case of an empty table.
- Use the Angular Forms Module.

The form is defined in the template and passes data to the component upon submission. Typically, an EventEmitter transfers the data to the parent component.

- Use the `FormsModule` in the component's imports array (enriches templates with additional HTML markup to create objects from forms).
- `<form #form="ngForm">...</form>` defines how the HTML form creates an object manageable within the template using the `form` template variable.
- The `form` object is passed as an argument to `onSubmit(form)` when the `onSubmit` event occurs (triggered by the Submit button, which can only be clicked when the form is correctly filled out (valid)).
- Assign the input's name attribute to the name of the object's property produced by the form and associated with that particular input. This property participates in the object only if we include the `ngModel` directive.
- With `#firstName="ngModel"`, we declare the template variable named `firstName`, which is an object that can be examined for correctness with `firstName.errors` and used conditionally to display explanatory text for any validation errors.

## Step 13: Reactive Forms

- We start with the same steps as in step 11.

The form is defined in the component and connected to the template's inputs. A click handler transfers the data to the component, and then an EventEmitter transfers the data to the parent component.

- Use the `ReactiveFormsModule` in the component's imports array (enriches templates with additional HTML markup to associate them with the component's properties).
- Use the `FormGroup` and `FormControl` classes to structure the object produced by the form. Utilize `Validators`.
- Bind the component's `form` property using `[formGroup]="form"` in the template.
- Connect the input to the `FormControl` using `formControlName`.
- Access the form field directly with `form.get('field name')`.
- Upon submission, the `form` property already has a value in the component.
