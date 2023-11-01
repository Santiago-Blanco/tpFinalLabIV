import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
