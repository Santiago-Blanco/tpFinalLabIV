import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent {
  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    console.log(this.route.paramMap);
  }

}
