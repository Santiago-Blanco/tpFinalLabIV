  import { Component, Input, OnInit } from '@angular/core';
  import { Team } from 'src/app/types/Teams';
  import { FavouriteListService } from 'src/app/Servicios/FavouriteListTeam/favourite-list-team.service';
  import { Player } from 'src/app/types/Players';
  import { Howl } from 'howler';

  @Component({
    selector: 'app-favourite-list',
    templateUrl: './favourite-list.component.html',
    styleUrls: ['./favourite-list.component.css']
  })
  export class FavouriteListComponent {


    private soundOUT : Howl;
    @Input() favoriteList: Team[] = []
    public select: Team | null=null;
    public atribute=false;
    public selectedPlayer: Player | null = null;

    constructor(private favoriteListService: FavouriteListService) { 

  
      this.soundOUT = new Howl({
        src: ['/assets/nbaMP3out.mp3']
      })
    }


    ngOnInit() {

      const data = this.favoriteListService.getData();

      if (data){
        this.favoriteList = data;
      } else {
        this.favoriteList = [];
      }

    }

    soundsOUT(){
      this.soundOUT.stop();
      this.soundOUT.volume(0.3);
      this.soundOUT.play();
    }

    showAtributesFavTeam(team: Team) {
      if (this.select === team) {
        this.select = null;
        this.atribute = false;
      }
      else {
        this.select = team;
        this.atribute = true;
        //this.selectedPlayer = this.favoriteListService.getPlayersByTeamId(team.id)
      }
    }

    addRemoveTeamList(team: Team) {
      const id = this.favoriteList.findIndex((t) => t.id === team.id);
      if (id !== -1) {
        this.favoriteList.splice(id, 1);

        this.soundsOUT();
        
  
      
      } else {
        this.favoriteList.push(team);
        console.log(this.favoriteList);
  
       
      }
  
      this.favoriteListService.update(this.favoriteList);
    }

    searchTeam(team: Team){
      return this.favoriteList.some(t => t.id == team.id)
    }
  

  }




