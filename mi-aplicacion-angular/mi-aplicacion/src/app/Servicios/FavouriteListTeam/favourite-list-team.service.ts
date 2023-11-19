import { Injectable } from '@angular/core';
import { Team } from 'src/app/types/Teams';
import { BehaviorSubject, retry } from 'rxjs';
import { LoginRegisterService } from '../LoginRegister/login-register.service';
import { Player } from 'src/app/types/Players';
import { Game } from 'src/app/types/Games';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, concatMap, toArray } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FavouriteListService {

  private favoriteList: Team[] = [];
  private apiUrl = 'https://www.balldontlie.io/api/v1';

  constructor(private service: LoginRegisterService, private http: HttpClient) {
  }

  update(list: Team[]) {
    this.favoriteList = list;

    let activeUser = this.service.getActiveUser();

    activeUser.teamFavouriteList = this.favoriteList;

    this.service.updateUser(activeUser);  //actualiza el usuario con su nueva lista de favoritos en el localstorage

    console.log("USUARIO ACTIVO:");
    console.log(activeUser);
  }

  getData() {
    const activeUser = this.service.getActiveUser()

    return activeUser.teamFavouriteList;
  }

  getTeamById(teamId: number): Team | undefined {
    return this.favoriteList.find((team) => team.id === teamId);
  }

  getRecentResults(teamId: number, limit: number = 5): Observable<Game[]> {
    const resultsUrl = `${this.apiUrl}/games?team_ids[]=${teamId}&limit=${limit}`;
    return this.http.get<Game[]>(resultsUrl).pipe(
      map((data: any) => {
        const dataArray = data && data.data ? data.data : [];////////////////////////
        if (Array.isArray(dataArray)) {
          return dataArray;
        } else {
          console.error('Los datos de resultados no son un array:', data);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error al obtener resultados:', error);
        return [];
      })
    );
  }

  private fetchPlayersPage(teamId: number, page: number): Observable<Player[]> {
    const playersUrl = `${this.apiUrl}/players?teamId=${teamId}&per_page=100&page=${page}`;

    return this.http.get(playersUrl).pipe(
      map((data: any) => {
        const dataArray = data && data.data ? data.data : [];
        if (Array.isArray(dataArray)) {
          return dataArray;
        } else {
          console.error('Los datos de jugadores no son un array:', data);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error al obtener jugadores:', error);
        return of([] as Player[]); 
      })
    );
  }

  private fetchAllPlayersRecursive(teamId: number, page: number, allPlayers: Player[]): Observable<Player[]> {
    return this.fetchPlayersPage(teamId, page).pipe(
      concatMap((players: Player[]) => {
        if (players.length > 0) {
          allPlayers = allPlayers.concat(players);
          return this.fetchAllPlayersRecursive(teamId, page + 1, allPlayers);
        } else {
          return of(allPlayers);
        }
      })
    );
  }

  getPlayersForTeam(teamId: number): Observable<Player[]> {
    return this.fetchAllPlayersRecursive(teamId, 1, []).pipe(
      map((players: Player[]) => {
       
        return players.filter((player: Player) => player.team.id === teamId);
      })
    );
  }
}
  


