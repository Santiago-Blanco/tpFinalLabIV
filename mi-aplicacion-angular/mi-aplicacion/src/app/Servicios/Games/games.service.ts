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

      const currentDate = new Date(new Date().getFullYear(), 0, 1);
      const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31)

      const dateS = currentDate.toISOString().split('T')[0];
      const endDate = lastDayOfYear.toISOString().split('T')[0];

      const url = `https://www.balldontlie.io/api/v1/games?team_ids[]=${arrayIds.join('&team_ids[]=')}&start_date=${dateS}&end_date=${endDate}&per_page=100&status=Final`;

      try {
        const gamesData: any = await this.httpClient.get(url).toPromise();

        gamesData.data.sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });

        return gamesData;
        
      } catch (error) {
        console.error('Error al realizar la solicitud a la API.', error);
        return null;
      }
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


