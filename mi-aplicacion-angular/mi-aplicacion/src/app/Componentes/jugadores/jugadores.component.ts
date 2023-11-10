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
  public count=1;


  constructor(private favoriteListService: FavouriteListService, private JugadoresService: PlayersService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getAllPlayers(1);
    console.log(this.route.paramMap)
    this.favoriteList = this.favoriteListService.getData();
  }

  nextPage(): void {
    if(this.count <= 209){
      this.count = this.count+1;
      
      this.getAllPlayers(this.count);
      console.log(this.count)
    }
    
  }

  backPage(): void{
    if(this.count>1){
      this.count = this.count-1;

      this.getAllPlayers(this.count);
      console.log(this.count)
    }
    
  }
  

  getAllPlayers(i : number) {
    return this.JugadoresService.getAllPlayers(i).subscribe((p: Player[] | any) => {

      console.log(p.data);
      this.playersList = this.filterPlayers(p.data);
      console.log(this.playersList);
    })
  }
  //filtra los jugadores para dejar en el array los jugadores que no tengan atributos vacios
  filterPlayers(array: Player[]) {
    return array.filter(player =>
      Object.values(player).some(value => value !== null)
    );
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


