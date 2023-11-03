import { Component, Input } from '@angular/core';
import { Team } from 'src/app/types/Teams';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent {
  @Input() favoriteList: Team[] = []

  
}
