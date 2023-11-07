  import { Component, Input, OnInit } from '@angular/core';
  import { Team } from 'src/app/types/Teams';
  import { FavouriteListService } from 'src/app/Servicios/FavouriteListTeam/favourite-list.service';
  import { Player } from 'src/app/types/Players';

  @Component({
    selector: 'app-favourite-list',
    templateUrl: './favourite-list.component.html',
    styleUrls: ['./favourite-list.component.css']
  })
  export class FavouriteListComponent {
    @Input() favoriteList: Team[] = []
    public select: Team | null=null;
    public atribute=false;
    public selectedPlayer: Player | null = null;

    constructor(private favoriteListService: FavouriteListService) { }

    ngOnInit() {

      this.favoriteList = this.favoriteListService.getData();
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

  }




