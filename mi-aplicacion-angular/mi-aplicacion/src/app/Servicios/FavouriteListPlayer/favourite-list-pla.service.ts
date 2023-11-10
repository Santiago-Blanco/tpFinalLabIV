import { Injectable } from '@angular/core';
import { Player } from 'src/app/types/Players';
import { BehaviorSubject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteListService {

  private favoriteList: Player[] = [];

  constructor() {
    this.getFavoriteList();
  }

  setItem() {

    localStorage.setItem('favoriteListPlayers', JSON.stringify(this.favoriteList));

  }
  getFavoriteList() {

    const stored = localStorage.getItem('favoriteListPlayers');
    this.favoriteList = stored ? JSON.parse(stored) : []

  }

  update(list: Player[]) {
    this.favoriteList = list;
    this.setItem();
  }

  getData() {
    return this.favoriteList;
  }

  /* getPlayersByTeamId(teamId: number): Player[] {
    return this.favoriteList.filter(player => player.team.id === teamId);
  } */

}
