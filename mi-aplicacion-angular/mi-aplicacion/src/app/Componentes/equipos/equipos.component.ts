import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../Servicios/Teams/teams.service';
import { Team } from 'src/app/types/Teams';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})


export class EquiposComponent implements OnInit {

  public teamsList: Team[] = [];
  public Favorite: Boolean = false

  constructor(private EquiposService: TeamsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllTeams();
    console.log(this.route.paramMap)
  }

  getAllTeams() {
    return this.EquiposService.getAllTeams().subscribe((t: Team[] | any) => {
      this.teamsList = t.data;
      console.log(t);
    })
  }

  addRemoveTeamList(team: Team) {
    const id = this.teamsList.findIndex((t) => t.id === team.id);
    if (id !== -1) {
      this.teamsList.splice(id, 1);
      this.Favorite = false;
    } else {
      this.teamsList.push(team);
      this.Favorite = true;
    }
  }
}


