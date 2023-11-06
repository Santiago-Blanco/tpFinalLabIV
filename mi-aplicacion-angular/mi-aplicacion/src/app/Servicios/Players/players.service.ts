import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from 'src/app/types/Players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private httpClient:HttpClient) { }


  getAllPlayers(){

    const datos=this.httpClient.get("https://www.balldontlie.io/api/v1/players?page=1")
    return datos;

  }
  
}

export class playerService {
  private playerList = new Array<Player>()
  constructor(){}

  add(player: Player){
    this.playerList.push(player)
  }
  
  remove(player: Player){
    this.playerList;
  }
}
  

