
import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';
import { Team } from '../types/Teams';



@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})

export class EquiposComponent implements OnInit {

const teams: Team[] = [];

constructor (private EquiposService: TeamsService){}

ngOnInit(): void {
  this.getAllTeams();
  
}


getAllTeams (){
  return this.EquiposService.getAllTeams().subscribe((x: Team[] | any)=> {
    this.teams=x;
    console.log(x);
  })
}
}