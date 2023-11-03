import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from 'src/app/types/Teams';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private httpClient: HttpClient) {  
  }

  getAllTeams() {
    const datos = this.httpClient.get("https://www.balldontlie.io/api/v1/teams")
    return datos
  }
}

export class teamService {
  private teamList = new Array<Team>()
  constructor(){}

  add(team: Team){
    this.teamList.push(team)
  }
  
  remove(team: Team){
    this.teamList
  }
}
