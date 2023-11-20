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
  public showNextButton : boolean = true;
  public showBackButton: boolean = false;

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

    const data = this.favoriteListService.getData();

    if (data){
      this.favoriteList = data;
    } else {
      this.favoriteList = [];
    }
    
  }


    
  nextPage(): void {
    this.getAllTeams(2);
    this.showBackButton = true;
    this.showNextButton = false;
  }

  backPage(): void {
    this.getAllTeams(1);
    this.showNextButton=true;
    this.showBackButton=false;
  }

  
  getAllTeams(i : Number) {
    return this.EquiposService.getAllTeams(i).subscribe((t: Team[] | any) => {
      this.teamsList.length = 0;
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

  handleKeyDown(): void { ////si es la primera letra presionada llena el array
    if (this.isFirstKeyDown) {
      this.isFirstKeyDown = false;

      this.EquiposService.fillArrayOfTeams().then((allTeams)=>{
        this.teamsList = allTeams;
        console.log(this.teamsList);

        
      })
      .catch((reject)=>{
        console.log("Msg Error: " + reject);
      })

      
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


