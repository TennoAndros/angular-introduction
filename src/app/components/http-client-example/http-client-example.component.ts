import { Component, OnInit, inject } from '@angular/core';
import { ChuckNorrisJoke, DadJoke } from 'src/app/shared/interfaces/jokes';
import { JokesService } from 'src/app/shared/services/jokes.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-http-client-example',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './http-client-example.component.html',
  styleUrl: './http-client-example.component.css',
})
export class HttpClientExampleComponent implements OnInit {
  jokeService = inject(JokesService);
  dadJoke: string = '';
  chuckNorrisJoke: string = '';

  ngOnInit(): void {
    // this.jokeService.getDadJoke().subscribe((data: DadJoke) => {
    //   console.log(data.joke);
    //   this.dadJoke = data.joke;
    // });
    this.refreshDadJoke();
    // this.jokeService.getChuckNorrisJoke().subscribe((data: ChuckNorrisJoke) => {
    //   console.log(data.value);
    //   this.chuckNorrisJoke = data.value;
    // });
    this.refreshChuckNorrisJoke();
  }

  refreshDadJoke() {
    this.jokeService.getDadJoke().subscribe((data: DadJoke) => {
      console.log(data);
      this.dadJoke = data.joke;
    });
  }

  refreshChuckNorrisJoke() {
    this.jokeService.getChuckNorrisJoke().subscribe((data: ChuckNorrisJoke) => {
      console.log(data);
      this.chuckNorrisJoke = data.value;
    });
  }
}
