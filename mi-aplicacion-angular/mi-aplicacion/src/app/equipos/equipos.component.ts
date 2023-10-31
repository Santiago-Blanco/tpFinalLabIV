
import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';
import { Team } from '../types/Teams';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})


export class EquiposComponent implements OnInit {

  public teams: Team[] = [];

  constructor(private EquiposService: TeamsService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllTeams();
    console.log(this.route.paramMap)

  }


  getAllTeams() {
    return this.EquiposService.getAllTeams().subscribe((x: Team[] | any) => {
      this.teams = x;
      console.log(x);
    })
  }
}

