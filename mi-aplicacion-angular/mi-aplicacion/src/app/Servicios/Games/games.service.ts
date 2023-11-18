import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from 'src/app/types/Games';
import { TeamsService } from '../Teams/teams.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private games: Game[] = []

  constructor(private httpClient: HttpClient, private serviceTeam: TeamsService) { }

  getAllGames(i: Number) {

    const datos = this.httpClient.get(`https://www.balldontlie.io/api/v1/games?page=${i}`)
    return datos;
  }

  async getGamesOfTeam(name: string): Promise<any> {

    const arrayIds = await this.serviceTeam.getTeamIDsByName(name);

    if (arrayIds.length > 0) {
      const gamesData = await this.httpClient.get(`https://www.balldontlie.io/api/v1/games?team_ids[]=${arrayIds.join('&team_ids[]=')}`).toPromise();
      return gamesData;
    } else {
      console.log('No se encontraron IDs de equipos.');
      return null;
    }
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


