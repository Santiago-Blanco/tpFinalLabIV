import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from 'src/app/types/Teams';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private allTeams: Team[] = [];

  constructor(private httpClient: HttpClient) {  
  }

  async getAllTeamsForSearch(i : Number) { 
    return new Promise<void>((resolve, reject) => {
      this.getAllTeams(i).subscribe((t: Team[] | any) => {

      
        this.allTeams = this.allTeams.concat(t.data);
        resolve();
      },
        error => reject(error)
      );
    });
  }

  async fillArrayOfTeams(): Promise<Team[]>{

    this.resetArray();

    for(let i=1; i<3; i++){
      await this.getAllTeamsForSearch(i);
      //2
    }

    
    return this.allTeams;
  }

  resetArray(){
    this.allTeams.length = 0;
  }

  async getTeamIDsByName(teamName: string): Promise<number[]> {
    await this.fillArrayOfTeams();
  
    const matchingTeams = this.allTeams.filter((team) =>
      team.full_name.toLowerCase().includes(teamName.toLowerCase())
    );
  
    const teamIDs = matchingTeams.map((team) => team.id);
  
    return teamIDs;
  }


  getAllTeams(i : Number) {
    const datos = this.httpClient.get(`https://www.balldontlie.io/api/v1/teams?page=${i}`)
    return datos
  }
}


