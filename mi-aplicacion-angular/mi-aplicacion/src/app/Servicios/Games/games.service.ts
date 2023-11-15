import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from 'src/app/types/Games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private games: Game[]=[]

  constructor(private httpClient: HttpClient) { }

  getAllGames(i:Number){

    const datos=this.httpClient.get(`https://www.balldontlie.io/api/v1/games?page=${i}`)
    return datos;
  }

  getGamesOfTeam(){
    return this.httpClient.get('https://www.balldontlie.io/api/v1/games?team_ids[]=1');
  }
}


export class gamesService {
  private gamesList = new Array<Game>()
  constructor() { }

  add(game: Game) {
    this.gamesList.push(game)
  }

  remove(game: Game) {
    this.gamesList;
  }

}


