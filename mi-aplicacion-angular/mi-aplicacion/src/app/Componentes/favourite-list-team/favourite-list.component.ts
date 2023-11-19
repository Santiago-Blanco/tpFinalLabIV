  import { Component, Input, OnInit } from '@angular/core';
  import { Team } from 'src/app/types/Teams';
  import { FavouriteListService } from 'src/app/Servicios/FavouriteListTeam/favourite-list-team.service';
  import { Player } from 'src/app/types/Players';
  import { Howl } from 'howler';
  import { Game } from 'src/app/types/Games';

  @Component({
    selector: 'app-favourite-list',
    templateUrl: './favourite-list.component.html',
    styleUrls: ['./favourite-list.component.css']
  })
  export class FavouriteListComponent implements OnInit {


    private soundOUT : Howl;
    @Input() favoriteList: Team[] = []
    public select: Team | null=null;
    public atribute=false;
    public selectedPlayer: Player | null = null;
    public recentResults: Game[] = [];
    public teamPlayers: Player[] = [];

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
      } else {
        this.select = team;
        this.atribute = true;
        //this.selectedPlayer = this.favoriteListService.getPlayersByTeamId(team.id)

        
        const teamData = this.favoriteListService.getTeamById(team.id);
    
        if (teamData) {
          this.favoriteListService.getRecentResults(teamData.id).subscribe(
            (data) => {
              console.log('Resultados obtenidos:', data);
              if (Array.isArray(data)) {
                this.recentResults = data;
              } else {
                console.error('Los datos de resultados no son un array:', data);
                this.recentResults = [];
              }
            },
            (error) => {
              console.error('No hay resultados:', error);
              this.recentResults = [];
            }
          );
    
          this.favoriteListService.getPlayersForTeam(teamData.id).subscribe(
            (data) => {
              console.log('Jugadores obtenidos:', data);
              if (Array.isArray(data)) {
                this.teamPlayers = data;
              } else {
                console.error('Los datos de jugadores no son un array:', data);
                this.teamPlayers = [];
              }
            },
            (error) => {
              console.error('No hay jugadores:', error);
              this.teamPlayers = [];
            }
          );
        } else {
          console.error('No se encontraron datos para el equipo:', team);
          this.recentResults = [];
          this.teamPlayers = [];
        }
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




