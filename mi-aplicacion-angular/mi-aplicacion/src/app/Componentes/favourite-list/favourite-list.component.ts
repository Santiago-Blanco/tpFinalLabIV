import { Component, Input, OnInit} from '@angular/core';
import { Team } from 'src/app/types/Teams';
import { FavouriteListService } from 'src/app/Servicios/FavouriteList/favourite-list.service';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent {
  @Input() favoriteList: Team[] = []

  constructor (private favoriteListServive: FavouriteListService){
    this.favoriteList = favoriteListServive.getFavoriteList()
  }

}
  



