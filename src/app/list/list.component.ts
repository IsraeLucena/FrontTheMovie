import { Component, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";

interface movie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  token = "99e59321f4d513001c9354ba7141903b";
  p: number = 1;
  collection: any;
  totalItens;
  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.getTopMovies();
  }

  getTopMovies() {
    this.http
      .get(`movie/top_rated?api_key=${this.token}&language=pt-BR`)
      .toPromise()
      .then((data: any) => {
        console.log(data);
        const collection = new Array<movie>();
        collection.length = data.total_results;
        data.results.forEach((element, index) => {
          collection[index] = element;
        });
        this.collection = collection;
        this.totalItens = this.collection.length;
      });
  }
}
