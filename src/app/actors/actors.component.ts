import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent {
  constructor(private _TrendingService:TrendingService ){}

  Actors:any[]=[]
  imgBaseUrl:string = 'https://image.tmdb.org/t/p/w500';
  mediaType:string = 'person';

  ngOnInit(): void {
    this._TrendingService.getActors().subscribe({
      next:(data)=> {
        this.Actors = data.results.slice(0,18)
        console.log( data);
        
      }
    })
  }
}
