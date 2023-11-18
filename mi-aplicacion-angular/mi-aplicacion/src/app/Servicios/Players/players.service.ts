import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from 'src/app/types/Players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private players: Player[] = []
  constructor(private httpClient: HttpClient) { }


  getAllPlayers(i : Number) {

    const datos = this.httpClient.get(`https://www.balldontlie.io/api/v1/players?page=${i}`)
    return datos;

  }

  getPlayersForName(name : string){
    const datos = this.httpClient.get(`https://www.balldontlie.io/api/v1/players?search=${name}`);
    return datos;
  }

  getSeasonAverages(playerId: number) {
    const datos = this.httpClient.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`);
    return datos;
  }
}

export class playerService {
  private playerList = new Array<Player>()
  constructor() { }

  add(player: Player) {
    this.playerList.push(player)
  }

  remove(player: Player) {
    this.playerList;
  }

}


