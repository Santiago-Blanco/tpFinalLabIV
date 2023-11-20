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
  public select: Game | null = null;
  public atribute = false;
  public count = 1;
  private submitClick: boolean = false;
  private submitTeam: string = "";

  constructor(private JuegosService: GamesService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getAllGames(1);
    console.log(this.route.paramMap)

  }

  nextPage(): void {
    if (this.count <= 209) {
      this.count = this.count + 1;

      this.getAllGames(this.count);
      console.log(this.count)
    }

  }

  backPage(): void {
    if (this.count > 1) {
      this.count = this.count - 1;

      this.getAllGames(this.count);
      console.log(this.count)
    }

  }


  getAllGames(i: number) {
    return this.JuegosService.getAllGames(i).subscribe((g: Game[] | any) => {

      console.log(g.data);
      this.GamesList = this.filterGames(g.data);
      console.log(this.GamesList);
    })
  }

  async getGamesForSearch(name: string) {
    const gamesData = await this.JuegosService.getGamesOfTeam(name);
    this.GamesList = gamesData;

    if (gamesData && gamesData.data) {
      console.log(gamesData.data);
      this.GamesList = this.filterGames(gamesData.data);
      console.log(this.GamesList);
    } else {
      this.GamesList = [];
      console.log('No se recibió datos válidos de la solicitud.');
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


}





