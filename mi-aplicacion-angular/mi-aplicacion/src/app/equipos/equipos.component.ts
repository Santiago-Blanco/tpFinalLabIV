<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';
import { Team } from '../types/Teams';

=======
import { Component } from '@angular/core';
>>>>>>> 779ec239136d1ee1c42467aa073dc16019ec1ca0

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
<<<<<<< HEAD

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
=======
export class EquiposComponent {
>>>>>>> 779ec239136d1ee1c42467aa073dc16019ec1ca0

}
