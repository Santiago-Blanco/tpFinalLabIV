import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/types/Games';
import { GamesService, gamesService } from 'src/app/Servicios/Games/games.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  public GamesList: Game[] = [];
  public select:Game| null=null;
  public atribute=false;
  public count=1;


  constructor( private JuegosService: GamesService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getAllGames(1);
    console.log(this.route.paramMap)
    
  }

  nextPage(): void {
    if(this.count <= 209){
      this.count = this.count+1;
      
      this.getAllGames(this.count);
      console.log(this.count)
    }
    
  }

  backPage(): void{
    if(this.count>1){
      this.count = this.count-1;

      this.getAllGames(this.count);
      console.log(this.count)
    }
    
  }
  

  getAllGames(i : number) {
    return this.JuegosService.getAllGames(i).subscribe((g:Game[] | any) => {

      console.log(g.data);
      this.GamesList = this.filterGames(g.data);
      console.log(this.GamesList);
    })
  }

  async getGamesForSearch(name : string) {
    const gamesData = await this.JuegosService.getGamesOfTeam(name);

    if (gamesData && gamesData.data) {
      console.log(gamesData.data);
      this.GamesList = this.filterGames(gamesData.data);
      console.log(this.GamesList);
    } else {
      console.log('No se recibió datos válidos de la solicitud.');
    }


  }



  filterGames(array:Game[]) {
    return array.filter(game =>
      Object.values(game).some(value => value !== null)
    );
  }

  filterResults(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();

    if (searchText.trim() === '') {
        this.getAllGames(1);
        return;
    } else {
      this.getGamesForSearch(searchText.trim());
    }

    /*this.GamesList = this.GamesList.filter(game =>
        game.visitor_team.full_name.toLowerCase().includes(searchText) ||
        game.home_team.full_name.toLowerCase().includes(searchText) ||
        game.date.toString().includes(searchText)
    );*/
}


  showAtributes(game:Game){

    if(this.select===game){
      this.select=null;
      this.atribute=false;
    }
    else{
      this.select=game;
      this.atribute=true;
    }

  }


}





