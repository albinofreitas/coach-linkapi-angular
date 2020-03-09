import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDbService } from '../movie-db.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieId: string;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private movieDbService: MovieDbService) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];

    this.getDetails();
  }

  async getDetails() {
    if(this.loading) return;

    try {
      this.movie = await this.movieDbService.getById(this.movieId);
      const credits = await this.movieDbService.getCredits(this.movieId);
      
      this.movie.actors = credits.cast.splice(0, 4);
      this.movie.director = credits.crew.find(({ job }) => job === 'Director');

      console.log(this.movie);
    } catch(error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  return() {
    window.history.back();
  }
}
