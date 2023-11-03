import { Injectable } from '@angular/core';
import { Team } from 'src/app/types/Teams';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteListService {

   private favoriteList: Team[] = [];
   favoriteList$ = new BehaviorSubject<Team[]>(this.favoriteList);
 
   constructor() { }
 
   getFavoriteList(): Team[] {
     return this.favoriteList;
   }
 
   addListFav(team: Team) {
     this.favoriteList.push(team);
     this.favoriteList$.next(this.favoriteList);
   }
 
   removeListFav(team: Team) {
     const index = this.favoriteList.findIndex(t => t.id === team.id);
     if (index !== -1) {
       this.favoriteList.splice(index, 1);
       this.favoriteList$.next(this.favoriteList);
     }
   }
 }
