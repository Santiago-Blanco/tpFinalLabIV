import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../Servicios/Teams/teams.service';
import { Team } from 'src/app/types/Teams';
import { ActivatedRoute } from '@angular/router';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListTeam/favourite-list-team.service';
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
  private isFirstKeyDown: boolean = true;

  constructor(private favoriteListService: FavouriteListService,private EquiposService: TeamsService, private route: ActivatedRoute) { 
    this.soundIN = new Howl({
      src: ['/assets/nbaMP3.mp3']
    })

    this.soundOUT = new Howl({
      src: ['/assets/nbaMP3out.mp3']
    })
  }

  ngOnInit(): void {
    this.getAllTeams(1);
    console.log(this.route.paramMap)
    this.favoriteList = this.favoriteListService.getData();
  }

  nextPage(): void {
    this.teamsList.length = 0;
    this.getAllTeams(2);

    let [back, next] = this.backNextButtons();

    next.style.display = 'block';
    back.style.display = 'none';
  }

  backPage(): void{
    this.teamsList.length = 0;
    this.getAllTeams(1);

    let [back, next] = this.backNextButtons();

    next.style.display = 'none';
    back.style.display = 'block';
  }

  backNextButtons(){
    let nextButton = document.querySelector(".next") as HTMLButtonElement;
    let backButton = document.querySelector(".back") as HTMLButtonElement;

    return [nextButton, backButton]
  }

  getAllTeams(i : Number) {
    return this.EquiposService.getAllTeams(i).subscribe((t: Team[] | any) => {
      this.teamsList = t.data;
      //console.log(this.teamsList);
    })
  }

  addRemoveTeamList(team: Team) {
    const id = this.favoriteList.findIndex((t) => t.id === team.id);
    if (id !== -1) {
      this.favoriteList.splice(id, 1);

      this.soundsOUT();
    } else {
      this.favoriteList.push(team);
      console.log(this.favoriteList);

      this.soundsIN();
    }

    this.favoriteListService.update(this.favoriteList);
  }
  
  soundsIN(){
    this.soundIN.stop();
    this.soundOUT.stop();
    this.soundIN.play();
  }

  soundsOUT(){
    this.soundOUT.stop();
    this.soundIN.stop();
    this.soundOUT.play();
  }

  searchTeam(team: Team){
    return this.favoriteList.some(t => t.id == team.id)
  }

/////////////////////////////////////////////////////////////////////////

  getAllTeamsForSearch(i : Number) { 
    return this.EquiposService.getAllTeams(i).subscribe((t: Team[] | any) => {
      this.teamsList = this.teamsList.concat(t.data);
      //console.log(this.teamsList);
    })
  }

  handleKeyDown(): void {
    if (this.isFirstKeyDown) {
      this.fillArray();
      this.isFirstKeyDown = false;
    }
  }

  filterTeams(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();

    if (searchText.trim() === '') {
        this.teamsList.length = 0;
        this.getAllTeams(1);
        this.isFirstKeyDown = true;

        return;
    }

    this.teamsList = this.teamsList.filter(team =>
        team.full_name.toLowerCase().includes(searchText) ||
        team.abbreviation.toLowerCase().includes(searchText) ||
        team.name.toLowerCase().includes(searchText)
    );
}

  fillArray(){
    this.teamsList.length = 0;

    for(let i=1; i<3; i++){
      this.getAllTeamsForSearch(i);
    }

    console.log("llenando el array ")
  }

/////////////////////////////////////////////////////////////

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


