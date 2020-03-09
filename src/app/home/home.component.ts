import { Component, OnInit } from '@angular/core';
import { MovieDbService } from '../movie-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: any[] = [];
  loading: boolean = false;
  searchTitle: string;

  constructor(private movieDbService: MovieDbService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  async getMovies() {
    try {
      if(this.loading) return;

      this.loading = true;
      
      const res: any = await this.movieDbService.getPopularMovies();

      this.movies = res.results;
    } catch(error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  async searchMovies() {
    if(!this.searchTitle) this.getMovies();
    if(this.loading) return;

    try {
      this.loading = true;
      
      const res: any = await this.movieDbService.getByName({ query: this.searchTitle });

      this.movies = res.results;
    } catch(error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
