import { Component, Input, OnInit} from '@angular/core';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListPlayer/favourite-list-pla.service';
import { Player } from 'src/app/types/Players';

@Component({
  selector: 'app-favourite-list-player',
  templateUrl: './favourite-list-player.component.html',
  styleUrls: ['./favourite-list-player.component.css']
})
export class FavouriteListPlayerComponent {


  @Input() favoriteList: Player[] = []


  constructor (private favoriteListService: FavouriteListService){}

  ngOnInit(){

    const data = this.favoriteListService.getData();

    if (data){
      this.favoriteList = data;
    } else {
      this.favoriteList = [];
    }
  }



}
