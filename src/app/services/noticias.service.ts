
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { NewsResponse, Article, ArticlesByCategoryAndPage } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { storedArticlesByCategory } from '../data/mock-news';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  //private articlesByCategoryAndPage: ArticlesByCategoryAndPage = storedArticlesByCategory as ArticlesByCategoryAndPage;
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor( private http: HttpClient ) { }

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey: apiKey,
        country: 'us',
      }
    })
  }

  getTopHeadlines():Observable<Article[]> {
    return this.getTopHeadlinesByCategory('business');
  }

  getTopHeadlinesByCategory( category: string, loadMore: boolean = false ):Observable<Article[]> {
    //return of(this.articlesByCategoryAndPage[category].articles);
    if ( loadMore ) {
      return this.getArticlesByCategory( category );
    }
    if ( this.articlesByCategoryAndPage[category] ) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }
    return this.getArticlesByCategory( category );
  }

  private getArticlesByCategory( category: string ): Observable<Article[]> {
    if ( Object.keys( this.articlesByCategoryAndPage ).includes(category) ) {
      // Ya existe
    } else {
      // No existe
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;
    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${ page }`)
    .pipe(
      map( ({ articles }) => {
        if ( articles.length === 0 ) return this.articlesByCategoryAndPage[category].articles;
        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles ]
        }
        return this.articlesByCategoryAndPage[category].articles;
      })
    );

  }

}
