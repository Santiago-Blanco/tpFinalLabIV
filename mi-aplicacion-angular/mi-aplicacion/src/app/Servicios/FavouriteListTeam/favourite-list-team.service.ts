import { Injectable } from '@angular/core';
import { Team } from 'src/app/types/Teams';
import { BehaviorSubject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteListService {

   private favoriteList: Team[] = [];
  
   constructor() { 
    this.getFavoriteList();
   }
 
   setItem(){

    localStorage.setItem('favoriteListTeam', JSON.stringify(this.favoriteList));

   }
   getFavoriteList() {
    
     const stored=localStorage.getItem('favoriteListTeam');
     this.favoriteList=stored ? JSON.parse(stored) :[]
     
   }

   update(list: Team[]){
    this.favoriteList=list;
    this.setItem();
   }
 
   getData(){
    return this.favoriteList;
   }
 }
