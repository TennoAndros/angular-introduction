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
  <input
    type="text"
    (input)="onInput($event)" />
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

## Step 14: HTTP Client Service

- To use the HTTP Client, intervention in `app.config.ts` is necessary:

```typescript
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi())],
};
```

-Create the `JokesService` with the command:

```bash
 ng generate service shared/services/jokes
```

-It's common practice to define the API URL with `const`:

````typescript
    const DAD_JOKES_API_URL = "https://icanhazdadjoke.com/";
    const JACK_NORRIS_JOKES_API_URL = "https://api.chucknorris.io/jokes/random";
    ```
````

-The service is a TypeScript class with the decorator `@Injectable({providedIn: 'root'})` allowing the service to be injected into all Angular components using `inject`.

-The `HttpClient` is an Angular service that provides the ability to send HTTP requests and receive HTTP responses. Our application services directly incorporate HttpClient using inject.

-Create the HttpClientExampleComponent to demonstrate the functionality of HttpClient through `JokesService`:

```bash
ng g c components/http-client-example
```

-Check the data type of the API responses with `console.log`.

```typescript
import { Component, inject } from "@angular/core";
import { JokesService } from "src/app/shared/services/jokes.service";

@Component({
  selector: "app-http-client-example",
  standalone: true,
  imports: [],
  templateUrl: "./http-client-example.component.html",
  styleUrl: "./http-client-example.component.css",
})
export class HttpClientExampleComponent {
  jokesService = inject(JokesService);

  ngOnInit(): void {
    this.jokesService.getDadJoke().subscribe((data) => {
      console.log(data);
    });
    this.jokesService.getChuckNorrisJoke().subscribe((data) => {
      console.log(data);
    });
  }
}
```

-Create the `DadJoke` and `ChuckNorrisJoke` interfaces in `shared/interfaces/jokes.ts`:

```typescript
export interface DadJoke {
  joke: string;
}

export interface ChuckNorrisJoke {
  value: string;
}
```

-Use the interfaces for casting in `HttpClient`.

```typescript
getDadJoke() {
    return this.http.get<DadJoke>(DAD_JOKES_API_URL, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getChuckNorrisJoke() {
    return this.http.get<ChuckNorrisJoke>(JACK_NORRIS_JOKES_API_URL, {
      headers: {
        Accept: 'application/json',
      },
    });
  }
```

-Update the application menu.

## Step 15: User Registration Form and Service

- From this point onwards, it is necessary to have Python installed and use the Python-Flask backend from the repository [angular-introduction-backend](https://github.com/christodoulos/angular-introduction-python-backend).

- Generate the environments with the command:

  ```bash
  ng generate environments
  ```

-Update the files environment.development.ts and environment.ts.

-Create the User interface in the file shared/interfaces/mongo-backend.ts:

```typescript
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
```

-Create the UserService with the command:

```bash
  ng generate service shared/services/user
```

- The `registerUser` method sends the complete data concerning the registration of a new user to the backend.

  - The `check_duplicate_email` method asks the backend if the `email` it receives as an argument is already used in any entry in the database.

- Creation of the `UserRegistrationComponent`, which implements a reactive form for the registration process:

  - It uses the `UserService` through dependency injection,
  - Initializes the `registrationStatus`,
  - Defines the registration form with two fields for the password that should receive exactly the same content from the user,
  - The second argument in the form definition via `FormGroup` is the **overall validator** of the form, in our case, the method of the class that checks if the two password inputs match.
    - In case of an error in any input, the Validator returns an object with a key indicating the error,
    - This key can then be used in the template to display an appropriate error message.

- Upon form submission, the `UserService` is used to submit the form data to the backend. The registration in the backend distinguishes between cases of backend response using the `next` and `error` callbacks:

  - `next`: the callback called when the backend sends an HTTP response `20*`.
  - `error`: the callback called when the backend sends an HTTP response `40*` or `50*`.
  - Accordingly, we set the `registrationStatus` to have the corresponding control in the template.

- Usage of the backend to check for the existence of a duplicate email in the database and usage of the information during the `blur` event to make the email field invalid.

## Step 16: User Authentication

- We create the `RestrictedContentExampleComponent`, which will function as the first "protected" area of our application, meaning it will only be accessible to users who have registered through registration and have successfully passed access control. We update the `app.routes.ts` and the menu in `list-group-menu.component.ts` as usual, and for now, all users have access.

- We create the `UserLoginComponent`, which will present the form requesting user credentials (email and password) in order to submit them to a method of the `UserService` that will communicate with the backend for their verification. The value of the form is converted to the type

```typescript
export interface Credentials {
  email: string;
  password: string;
}
```

as this type of data is expected by the endpoint `/user/login/` on the backend. The submission method with POST to the backend is located in `user.service.ts` (in case of successful access control check, a **JWT token** is created on the backend and returned in the `access_token` attribute of the response):

```typescript
loginUser(credentials: Credentials) {
    return this.http.post<{ access_token: string }>(
      `${API_URL}/login`,
      credentials,
    );
}
```

- The service call is made in the `onSubmit()` method of `UserLoginComponent`, where in the subscription to the backend response, we receive the result of the successful access control check in the `next` callback. Since what we will receive is an encoded JWT token, we need to decode it (after storing it in `localStorage`):

  ```bash
  npm i jwt-decode
  ```

- Signals in the Angular Framework 17+ allow the creation of variables that, through services, **all components** have access to the last value assigned to these variables. Additionally, binding a signal from a component gives the component the ability to **automatically react!** to changes in the signal.
- We will use a signal to implement the concept of an active authenticated user, which for our application will be an object of type (`src/app/shared/interfaces/mongo-backend.ts`):

```typescript
export interface LoggedInUser {
  fullName: string;
  email: string;
}
```

- If no user has logged in to the application, such as when the application just starts, then the signal will contain `null`; otherwise, it will contain the type `LoggedInUser` (in `src/app/shared/services/user.service.ts`):

  ```typescript
  user = signal<LoggedInUser | null>(null);
  ```

- We can track changes in signals by using `effect` in the service, where the callback it receives is automatically executed on every signal change:

  ```typescript
  effect(() => {
    if (this.user()) {
      console.log("User logged in:", this.user().fullName);
    } else {
      console.log("No user logged in");
    }
  });
  ```

- We are able to complete the callback of the subscription in the backend access check call:

  ```typescript
  this.userService.loginUser(credentials).subscribe({
    next: (response) => {
      const access_token = response.access_token;
      localStorage.setItem("access_token", access_token);
      const decodedTokenSubject = jwtDecode(access_token).sub as unknown as LoggedInUser;

      this.userService.user.set({
        fullName: decodedTokenSubject.fullName,
        email: decodedTokenSubject.email,
      });
      this.router.navigate(["restricted-content-example"]);
    },
    error: (error) => {
      console.error("Login error:", error);
      this.invalidLogin = true;
    },
  });
  ```

- Once the JWT token is decoded, its payload is assigned to the structure of the signal representing the current authenticated user using the `.set(value: T)` method. Only then is automatic redirection triggered to the protected area of our application.

- Additionally, the creation of a route guard is required to supervise in the `app.routes.ts` file that only authorized users have access to this specific component:

  ```bash
  ng generate guard shared/guards/auth
  ```

  Και στο `auth.guard.ts`:

  ```typescript
  export const authGuard: CanActivateFn = (route state)   => {
    const userService = inject(UserService);
    const router = inject(Router);

    if (userService.user()) {
      return true;
    }
    return router.navigate(['login']);
  };
  ```

  A route guard either returns true, allowing the component to be displayed in the `router-outlet`, or redirects to the login form to initiate the access control process.

- In order to display the full name of the logged-in user and for better organization of our application, we create the `NavbarComponent` and use the signal from the `UserService` to dynamically handle the template and conditionally display the user's name. Additionally, in this case, we display a prompt for logout.

- The logic for logout is located in the `UserService`:

  ```typescript
  logoutUser() {
    this.user.set(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
  ```

## Step 17: Implementation of the Fun for Nerds Exercise(T.I)

- Game Description

  The game consists of 3 Components:

1. **InputWordComponent**: Here, the user starts typing a word in an HTML input element. Depending on the length of the word, it is "considered" to be passed as Input to either the `EvenLengthWordsComponent` or the `OddLengthWordsComponent`.
2. **EvenLengthComponent and OddLengthComponent**: These components display words entered by the user. The words are displayed in red color based on their length, alternating between these two components. When the user presses the "Submit" button, the word is "locked" into the component corresponding to its length.

- How to Play

1. Start typing a word in the input field.
2. Depending on the length of the word, it will appear in one of the word display components.
3. Words are displayed in red until the user submits them.
4. Press "Submit" to lock the word into the respective component.
5. The game keeps track of the words you've locked so far.
