import { Component, Input, OnInit} from '@angular/core';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListPlayer/favourite-list-pla.service';
import { Player } from 'src/app/types/Players';
import { PlayersService } from 'src/app/Servicios/Players/players.service'; 


@Component({
  selector: 'app-favourite-list-player',
  templateUrl: './favourite-list-player.component.html',
  styleUrls: ['./favourite-list-player.component.css']
})
export class FavouriteListPlayerComponent {


  @Input() favoriteList: Player[] = []
  public select: Player | null = null;
  public atribute = false;
  public seasonAverages: any;


  constructor (private favoriteListService: FavouriteListService, private jugadoresServiceFav: PlayersService ){}

  ngOnInit(){

    const data = this.favoriteListService.getData();

    if (data){
      this.favoriteList = data;
    } else {
      this.favoriteList = [];
    }
  }

  getSeasonAverages(playerId: number) {
    this.jugadoresServiceFav.getSeasonAverages(playerId).subscribe(data => {
      this.seasonAverages = data;
      console.log(this.seasonAverages);
    });
  }

  showAtributes(player: Player) {
    if (this.select === player) {
      this.select = null;
      this.atribute = false;
    } else {
      this.select = player;
      this.atribute = true;
      this.getSeasonAverages(player.id);
      
    }


  }

  addRemovePlayerList(player: Player) {
    const id = this.favoriteList.findIndex((p) => p.id === player.id);
    if (id !== -1) {
      this.favoriteList.splice(id, 1);
      
    } else {
      this.favoriteList.push(player);
      console.log(this.favoriteList)

    }

    this.favoriteListService.update(this.favoriteList);
  }

  searchPlayer(player: Player){
    return this.favoriteList.some(p => p.id == player.id)
  }


}
