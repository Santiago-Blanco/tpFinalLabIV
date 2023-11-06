import { Component, Input, OnInit} from '@angular/core';
import { Team } from 'src/app/types/Teams';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListTeam/favourite-list.service';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent {
  @Input() favoriteList: Team[] = []

  constructor (private favoriteListService: FavouriteListService){}

  ngOnInit(){

    this.favoriteList= this.favoriteListService.getData();
  }
  

}
  



