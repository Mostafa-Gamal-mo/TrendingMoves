import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../trending.service';
import { ActivatedRoute } from '@angular/router';
ActivatedRoute

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _TrendingService: TrendingService, private _ActivatedRoute: ActivatedRoute) { }

  item: any;
  similar: any[] = [];
  media_Type: string = '';

  ngOnInit(): void {
    let { id, mediaType } = this._ActivatedRoute.snapshot.params;
    this.media_Type = mediaType;
    this._TrendingService.getTrendingDerails(id, mediaType).subscribe({
      next: (data) => {
        this.item = data
      }
    })
    this._TrendingService.getSimilar(id, mediaType).subscribe({
      next: (data) => {
        this.similar = data.results.filter((item:any)=>item.poster_path !== null ).slice(0,6)
        console.log(data.results);

      }
    })
  }
  antherDetails(id:string , media_Type :string){
    this.media_Type = media_Type;
    this._TrendingService.getTrendingDerails(id, media_Type).subscribe({
      next: (data) => {
        this.item = data
      }
    })
    this._TrendingService.getSimilar(id, media_Type).subscribe({
      next: (data) => {
        this.similar = data.results.filter((item:any)=>item.poster_path !== null ).slice(0,6)
        console.log(data.results);

      }
    })
  }


}
