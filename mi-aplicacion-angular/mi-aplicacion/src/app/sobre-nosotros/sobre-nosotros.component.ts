import { Component } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css']
})
export class SobreNosotrosComponent {
  constructor(private route: ActivatedRoute) { }
}
