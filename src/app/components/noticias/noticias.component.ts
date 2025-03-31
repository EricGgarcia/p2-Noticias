
import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
  standalone: false
})

export class NoticiasComponent {

  @Input() articles: Article[] = [];

  constructor() { }

}
