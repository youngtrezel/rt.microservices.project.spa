import { Component } from '@angular/core';
import { JsonPipe, NgFor, NgIf, CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarketingService } from '../services/marketing/marketing.service';
import { Plate } from '../../models/plate';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [JsonPipe, CommonModule, PaginationComponent],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent {

  plateForm!: FormGroup;
  pagedResults: Plate[];
  plateCount: any = 500;
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 0;
  populated: boolean = false;
  showMainList: boolean = true;
  selectedPlate: Plate | any;
  plateSelected: boolean = false;
  promotionalPrice: number = 0;
  discountApplied: string = "";
  unqualifyDiscount: boolean = false;

  constructor(private formBuilder: FormBuilder, private marketingService: MarketingService) {
    this.pagedResults = [];
  }

  ngOnInit() : void {
    this.refreshPlates();
  }

  refreshPlates() {
    this.getPlateCount();
    this.getPlates();
  }

  selectPlate(plate: Plate) {
    this.selectedPlate = plate;
    this.plateSelected = true;
    this.promotionalPrice = this.addPromotion();
  }

  selectPromotion(promo: string) {
    this.discountApplied = promo;
    this.promotionalPrice = this.addPromotion();
  }

  addPromotion() : number {
    switch(this.discountApplied) {
      case "discount":
        this.unqualifyDiscount = false
        return this.selectedPlate.SalePrice - 25
      case "percentoff":
        this.unqualifyDiscount = true
        return this.selectedPlate.SalePrice - ((this.selectedPlate.SalePrice/100) * 15 )
      default:
        this.unqualifyDiscount = false
        return this.selectedPlate.SalePrice  
    }
  }

  sortedArray(soldArray: Plate[]) : Plate[] {

    var sorted = soldArray.sort((n1, n2) => n1.DateSold - n2.DateSold);

    return sorted;
  }

  getPlateCount() {
    this.marketingService.plateCount("unreserved").subscribe({
      next: (data) => {
        this.plateCount = data.Result;      
      },
      error: err => console.log(err)
    })
  }

  getPlates() {
    this.marketingService.getPlates(this.currentPage, this.itemsPerPage, true).subscribe({
      next: (data) => {
        this.pagedResults = data;
        this.populated = true;
      },
      error: err => console.log(err)
    })
  }

  addMarkup(price: number) : number {
    var markup = (price / 10 ) * 2;
    return markup + price;
  }

  onPageChange(page: number) { 
    this.currentPage = page;
    this.getPlates();
  }

}
