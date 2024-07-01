import { Component } from '@angular/core';
import { JsonPipe, NgFor, NgIf, CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesService } from '../services/sales/sales.service';
import { Plate } from '../../models/plate';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-sell-plates',
  standalone: true,
  imports: [JsonPipe, CommonModule, PaginationComponent],
  templateUrl: './sell-plates.component.html',
  styleUrl: './sell-plates.component.scss'
})
export class SellPlatesComponent {

  plateForm!: FormGroup;
  pagedResults: Plate[];
  soldResults: Plate[];
  plateCount: any = 500;
  soldPlateCount: any = 500;
  currentPage: number = 1;
  currentSoldPage: number = 1;
  itemsPerPage: number = 20;
  soldItemsPerPage: number = 13;
  totalItems: number = 0;
  populated: boolean = false;
  soldPopulated: boolean = false;
  plateSold: boolean = false;
  soldPlate!: Plate;
  showList = false;
  showMainList = true;
  revenue: number = 0;

  constructor(private formBuilder: FormBuilder, private salesService: SalesService) {
    this.pagedResults = [];
    this.soldResults = [];
  }

  ngOnInit() : void {
    this.refreshPlates();
  }

  refreshPlates() {
    this.getPlateCount();
    this.getPlates();
    this.getSoldPlateCount();
    this.getSoldPlates();
    this.getRevenue();
  }

  getRevenue() {
    this.salesService.getRevenue().subscribe({
      next: (data) => {
        this.revenue = data.Result;
      },
      error: err => console.log(err)
     })
  }

  sortedArray(soldArray: Plate[]) : Plate[] {

    var sorted = soldArray.sort((n1, n2) => n1.DateSold - n2.DateSold);

    return sorted;
  }

  purchasePlate(registration: string) {
    this.salesService.sellPlate(registration).subscribe({
      next: (data) => {
        this.soldPlate = data;
        this.plateSold = true;

        setTimeout(() => {
          this.plateSold = false;
        }, 3000);

        setTimeout(() => {
          this.refreshPlates();
        }, 1000);

      },
      error: err => console.log(err)
    })
  }

  getPlateCount() {
    this.salesService.plateCount("unreserved").subscribe({
      next: (data) => {
        this.plateCount = data.Result;      
      },
      error: err => console.log(err)
    })
  }

  getSoldPlateCount() {
    this.salesService.plateSoldCount().subscribe({
      next: (data) => {
        this.soldPlateCount = data.Result;      
      },
      error: err => console.log(err)
    })
  }
  
  getSoldPlates() {
    this.salesService.getSoldPlates(this.currentSoldPage, this.soldItemsPerPage).subscribe({
      next: (data) => {
        this.soldResults = this.sortedArray(data.Result);
        this.soldPopulated = true;
      },
      error: err => console.log(err)
    })
  }

  getPlates() {
    this.salesService.getPlates(this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {
        this.pagedResults = data.Result;
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

  onSoldPageChange(page: number) { 
    this.currentSoldPage = page;
    this.getSoldPlates();
  }



}
