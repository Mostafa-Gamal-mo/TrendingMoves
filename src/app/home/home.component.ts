import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../trending.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _TrendingService:TrendingService){

  }
  trendingMovies:any[]=[];
  trendingTv:any[]=[];
  trendingPeople:any[]=[];
  imgBaseUrl:string = 'https://image.tmdb.org/t/p/w500'

  

  ngOnInit(): void {
    this._TrendingService.getTrending('movie').subscribe({
      next:(response)=> this.trendingMovies = response.results.slice(0,10)
    })
    this._TrendingService.getTrending('tv').subscribe({
      next:(response)=> this.trendingTv = response.results.slice(0,10)
    })
    this._TrendingService.getTrending('person').subscribe({
      next:(response)=> this.trendingPeople = response.results.filter((item:any)=>item.profile_path !== null ).slice(0,10)
    })

  }



}
