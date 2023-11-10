import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/types/Games';
import { GamesService } from 'src/app/Servicios/Games/games.service';

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
  //filtra los jugadores para dejar en el array los jugadores que no tengan atributos vacios
  filterGames(array:Game[]) {
    return array.filter(game =>
      Object.values(game).some(value => value !== null)
    );
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





