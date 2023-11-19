import { Injectable } from '@angular/core';
import { Team } from 'src/app/types/Teams';
import { BehaviorSubject, retry } from 'rxjs';
import { LoginRegisterService } from '../LoginRegister/login-register.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteListService {

   private favoriteList: Team[] = [];
  
   constructor(private service : LoginRegisterService) { 
   }
 
   update(list: Team[]){
    this.favoriteList=list;

    let activeUser = this.service.getActiveUser();

    activeUser.teamFavouriteList = this.favoriteList;

    this.service.updateUser(activeUser);  //actualiza el usuario con su nueva lista de favoritos en el localstorage

    console.log("USUARIO ACTIVO:");
    console.log(activeUser);
   }
 
   getData(){
    const activeUser = this.service.getActiveUser()

    return activeUser.teamFavouriteList;
   }
 }
