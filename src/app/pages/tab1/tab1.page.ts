
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})

export class Tab1Page implements OnInit {

  @ViewChild( IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;

  public articles: Article[] = [];

  constructor( private newsService: NoticiasService ) {}

  ngOnInit() {
    this.newsService.getTopHeadlines()
      .subscribe( articles => this.articles.push( ...articles ) );
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory( 'business', true )
      .subscribe( articles => {
          if ( articles.length === this.articles.length ) {
            this.infiniteScroll.disabled = true;
            return;
          }
          this.articles = articles;
          this.infiniteScroll.complete();
        })

    }

}
