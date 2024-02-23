import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/types/Games';
import { GamesService} from 'src/app/Servicios/Games/games.service';
import { Team } from 'src/app/types/Teams';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  public GamesList: Game[] = [];
  public select: Game | null = null;
  public atribute = false;
  public count = 1;
  public allGamesList: Game[] = [];
   public currentPage: number = 1;
   public itemsPerPage: number = 25;
  private submitClick: boolean = false;
  private submitTeam: string = "";
  public isFirstPage: boolean = true;
  public isLastPage: boolean = false;
  public pageNumber : number = 1;
  private nextCursor: number | null = null;
  private prevCursor: number | null = null;



  constructor(private JuegosService: GamesService, private route: ActivatedRoute, private router : Router) { }


  ngOnInit(): void {
    this.getAllGames();
    

  }

  paginateGames(games: Game[], page: number): Game[] {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return games.slice(startIndex, endIndex);
  }
  
  getAllGames(cursor: number = 1) {
    this.JuegosService.getAllGames(cursor).subscribe((response: any) => {
      const newGames = response.data || [];
  
      this.allGamesList = this.allGamesList.concat(newGames);
  
     
      this.allGamesList.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
  
      
      this.GamesList = this.paginateGames(this.allGamesList, this.currentPage);
  
      this.updatePageVisibility();
    });
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.GamesList = this.paginateGames(this.allGamesList, this.currentPage);
  
      
      this.count = this.currentPage;
    }
  }
  
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.allGamesList.length) {
      this.currentPage++;
      this.GamesList = this.paginateGames(this.allGamesList, this.currentPage);
  
      
      this.count = this.currentPage;
    }
  }
  
  updatePageVisibility() {
    
    this.isFirstPage = this.currentPage === 1;
    this.isLastPage = this.currentPage * this.itemsPerPage >= this.allGamesList.length;
  }
  
  
  
  async getGamesForSearch(name: string) {
    const gamesData = await this.JuegosService.getGamesOfTeam(name);
    this.GamesList = gamesData;
  
    if (gamesData && gamesData.data) {
      console.log(gamesData.data);
      const filteredGames = this.filterGames(gamesData.data);
      this.GamesList = filteredGames;
      console.log(this.GamesList);
    } else {
      this.GamesList = [];
      console.log('No se recibió datos válidos de la solicitud.');
    }
  }
  

  goToTeam(id : Number){
    this.router.navigate(['/team', id]);

  }

  searchPage() {
    
    if (this.pageNumber <= 0) {
      this.pageNumber = 1;
    }
  

    this.count = this.pageNumber;
    this.getAllGames(this.pageNumber);
  }
  

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchPage();
    }
  }


  filterGames(array: Game[]) {
    return array.filter(game =>
      Object.values(game).some(value => value !== null)
    );
  }

  filterResults(event: Event) {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();

    if (searchText.trim() === '') {
      this.getAllGames(1);
      this.isLastPage=false;

    } else {
      this.isFirstPage=true;
      this.isLastPage=true;
    }
  }

  submitResults() {
    const searchText = (document.getElementById('search-input') as HTMLInputElement).value.toLowerCase();

    console.log(searchText);

    this.getGamesForSearch(searchText)
  }

  showAtributes(game: Game) {

    if (this.select === game) {
      this.select = null;
      this.atribute = false;
    }
    else {
      this.select = game;
      this.atribute = true;
    }

  }

  displayScore(homeScore: number, visitorScore: number): string {
    if (homeScore === 0 && visitorScore === 0) {
      return 'Próximamente';
    } else {
      return homeScore + ' ' + visitorScore;
    }
  }
  
  loadImage(id : number){
    if(id < 31){
      return `../../../assets/teams/${id}.webp`
    } else {
      return `../../../assets/teams/100.webp`
    }
    
  }


}





