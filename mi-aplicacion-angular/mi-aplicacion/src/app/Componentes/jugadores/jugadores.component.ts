import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/types/Players';
import { PlayersService } from 'src/app/Servicios/Players/players.service';
import { FavouriteListService } from 'src/app/Servicios/FavouriteListPlayer/favourite-list-pla.service';
import { Howl } from 'howler';
import { Router } from '@angular/router';
import { Team } from 'src/app/types/Teams';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  public playersList: Player[] = [];
  public favoriteList: Player [] = []
  public filList: Player []=[];
  public select: Player| null=null;
  public searchTerm: string= '';
  public atribute=false;
  public count=1;
  public seasonAverages: any;
  private soundIN : Howl;
  private soundOUT : Howl;
  public isFirstPage: boolean = true;
  public isLastPage: boolean = false;
  public pageNumber : number = 1;


  constructor(private router: Router, private favoriteListService: FavouriteListService, private JugadoresService: PlayersService, private route: ActivatedRoute) { 
    this.soundIN = new Howl({
      src: ['/assets/nbaMP3.mp3']
    })

    this.soundOUT = new Howl({
      src: ['/assets/nbaMP3out.mp3']
    })
  }


  ngOnInit(): void {
    this.getAllPlayers(1);
    console.log(this.route.paramMap)

    const data = this.favoriteListService.getData();

    if (data){
      this.favoriteList = data;
    } else {
      this.favoriteList = [];
    }

  }

  searchPage(){
    this.count = this.pageNumber;
    this.getAllPlayers(this.pageNumber);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchPage();
    }
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

  nextPage(): void {
    if (this.count < 209) {
      this.count = this.count + 1;
      this.getAllPlayers(this.count);
      this.updatePageVisibility();
    }
  
    if (this.count === 209) {
      this.isLastPage = true;
    }
  
    this.isFirstPage = false;
  }
  
  backPage(): void {
    if (this.count > 1) {
      this.count = this.count - 1;
      this.getAllPlayers(this.count);
      this.updatePageVisibility();
    }
  
    if (this.count === 1) {
      this.isFirstPage = true;
    }
  
    this.isLastPage = false;
  }
  
  updatePageVisibility() {
    this.isFirstPage = this.count === 1;
    this.isLastPage = this.count === 209; // O el número máximo de páginas
  }

  goToTeam(id : Number){
    this.router.navigate(['/team', id]);

  }

  getAllPlayers(i : number) {
    return this.JugadoresService.getAllPlayers(i).subscribe((p: Player[] | any) => {
      this.playersList = p.data; 
      console.log(p.data);
    })
  }

  getPlayersForSearch(name : string) {
    return this.JugadoresService.getPlayersForName(name).subscribe((p: Player[] | any) => {
      this.playersList = p.data; 

    })
  }

  getSeasonAverages(playerId: number) {
    this.JugadoresService.getSeasonAverages(playerId).subscribe(data => {
      this.seasonAverages = data;
      console.log(this.seasonAverages);
    });
  }

  searchPlayer(player: Player){
    return this.favoriteList.some(p => p.id == player.id)
  }

  searchPlayerFilt() {
   
    this.filList = this.playersList.filter(player =>
      (player.first_name + ' ' + player.last_name).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      player.team.full_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  } 

  filterPlayers(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();

    if (searchText.trim() === '') {
        this.playersList.length = 0;
        this.getAllPlayers(1);
        
        return;
    } else {
      this.getPlayersForSearch(searchText.trim());
    }

}

  addRemovePlayerList(player: Player) {
    const id = this.favoriteList.findIndex((p) => p.id === player.id);
    if (id !== -1) {
      this.favoriteList.splice(id, 1);
      
      this.soundsOUT()  
    } else {
      this.favoriteList.push(player);
      console.log(this.favoriteList)

      this.soundsIN()
    }

    this.favoriteListService.update(this.favoriteList);
  }
  


  showAtributes(player: Player){

    if(this.select===player){
      this.select=null;
      this.atribute=false;
    }
    else{
      this.select=player;
      this.atribute=true;
      this.getSeasonAverages(player.id);
    }

  }

}


