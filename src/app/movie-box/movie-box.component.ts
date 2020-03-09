import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.scss'],
  host: {
    "(click)": "goToDetails()"
  }
})
export class MovieBoxComponent implements OnInit {
  @Input() movie;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.movie);
  }

  goToDetails() {
    this.router.navigate([`/movie/${this.movie.id}`]);
  }

}
