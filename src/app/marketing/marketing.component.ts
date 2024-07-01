import { Component } from '@angular/core';
import { OrderedPlatesComponent } from '../ordered-plates/ordered-plates.component';
import { FilteredPlatesComponent } from '../filtered-plates/filtered-plates.component';
import { PromotionsComponent } from '../promotions/promotions.component';

import { JsonPipe, NgFor, NgIf, CommonModule } from '@angular/common';
@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [CommonModule, NgIf, OrderedPlatesComponent, FilteredPlatesComponent, PromotionsComponent],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent {

  ordered: boolean = true;
  filtered: boolean = false;
  promotions: boolean = false;

  isSelectedPage(page: string) {

    if(page == "ordered") {
      this.ordered = true;
      this.filtered = false;
      this.promotions = false;
    }
    if(page == "filtered") {
      this.ordered = false;
      this.filtered = true;
      this.promotions = false;
    } 
    if(page == "promotions") {
      this.ordered = false;
      this.filtered = false;
      this.promotions = true;
    } 
  }

}
