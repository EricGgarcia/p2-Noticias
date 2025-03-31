
import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})

export class Tab3Page {

  get articles(): Article[] {
    return this.storageService.getLocalArticles;
  }

  constructor( private storageService: DataLocalService ) {}

}
