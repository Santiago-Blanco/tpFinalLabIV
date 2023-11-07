import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../Servicios/Teams/teams.service';
import { Team } from 'src/app/types/Teams';
import { ActivatedRoute } from '@angular/router';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListTeam/favourite-list.service';
import { Howl } from 'howler';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})


export class EquiposComponent implements OnInit {

  private soundIN : Howl;
  private soundOUT : Howl;
  public teamsList: Team[] = [];
  public favoriteList: Team [] = []
  public select: Team | null=null;
  public atribute=false;

  constructor(private favoriteListService: FavouriteListService,private EquiposService: TeamsService, private route: ActivatedRoute) { 
    this.soundIN = new Howl({
      src: ['/assets/nbaMP3.mp3']
    })

    this.soundOUT = new Howl({
      src: ['/assets/nbaMP3out.mp3']
    })
  }

  ngOnInit(): void {
    this.getAllTeams();
    console.log(this.route.paramMap)
    this.favoriteList = this.favoriteListService.getData();
  }

  getAllTeams() {
    return this.EquiposService.getAllTeams().subscribe((t: Team[] | any) => {
      this.teamsList = t.data;
      console.log(t);
    })
  }

  addRemoveTeamList(team: Team) {
    const id = this.favoriteList.findIndex((t) => t.id === team.id);
    if (id !== -1) {
      this.favoriteList.splice(id, 1);

      this.soundOUT.stop();
      this.soundIN.stop();
      this.soundOUT.play();
    } else {
      this.favoriteList.push(team);
      console.log(this.favoriteList)

      this.soundIN.stop();
      this.soundOUT.stop();
      this.soundIN.play();
    }

    this.favoriteListService.update(this.favoriteList);
  }
  
  searchTeam(team: Team){
    return this.favoriteList.some(t => t.id == team.id)
  }

  showAtributes(team: Team){

    if(this.select===team){
      this.select=null;
      this.atribute=false;
    }
    else{
      this.select=team;
      this.atribute=true;
    }

  }
}


