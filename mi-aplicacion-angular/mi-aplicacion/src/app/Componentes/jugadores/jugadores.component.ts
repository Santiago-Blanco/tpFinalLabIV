import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/types/Players';
import { PlayersService } from 'src/app/Servicios/Players/players.service';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListPlayer/favourite-list-pla.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  public playersList: Player[] = [];
  public favoriteList: Player [] = []
  public select: Player| null=null;
  public atribute=false;
  


  constructor(private favoriteListService: FavouriteListService, private JugadoresService: PlayersService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getAllPlayers();
    console.log(this.route.paramMap)
    this.favoriteList = this.favoriteListService.getData();
  }

  getAllPlayers() {
    return this.JugadoresService.getAllPlayers().subscribe((p: Player[] | any) => {
      this.playersList = p.data;
      console.log(p);
    })
  }

  searchPlayer(player: Player){
    return this.favoriteList.some(p => p.id == player.id)
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
  


  showAtributes(player: Player){

    if(this.select===player){
      this.select=null;
      this.atribute=false;
    }
    else{
      this.select=player;
      this.atribute=true;
    }

  }

}


