import { Component } from '@angular/core';
import { JsonPipe, NgFor, NgIf, CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarketingService } from '../services/marketing/marketing.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { Plate } from '../../models/plate';

@Component({
  selector: 'app-filtered-plates',
  standalone: true,
  imports: [NgFor, NgIf, JsonPipe, ReactiveFormsModule, FormsModule, PaginationComponent, CommonModule],
  templateUrl: './filtered-plates.component.html',
  styleUrl: './filtered-plates.component.scss'
})
export class FilteredPlatesComponent {

  plateForm!: FormGroup;
  plateCount: any = 500;
  pagedResults: Plate[];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  populated: boolean = false;
  unpopulated: boolean = false;

  constructor(private formBuilder: FormBuilder, private marketingService: MarketingService) {
    this.pagedResults = [];
  }

  ngOnInit() : void {
    this.plateForm = this.formBuilder.group({
      Search: new FormControl((''), [Validators.required]),     
    });
    this.getPlateCount();
  }

  getPlates() {
    
    this.pagedResults = [];
    this.marketingService.getFilteredPlates(this.plateForm.value.Search, this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {

        if(data.length > 0) {
          this.pagedResults = data;
          this.populated = true;
        } else {
          this.populated = false;
          this.unpopulated = true;
        }
      },
      error: err => console.log(err)
    })
  }

  go() {
    this.getPlateCount();
    this.getPlates();
  }

  getPlateCount() {
    this.plateCount = 0;
    this.marketingService.plateCount(this.plateForm.value.Search).subscribe({
      next: (data) => {
        this.plateCount = data.Result;
      },
      error: err => console.log(err)
    })
  }

  onPageChange(page: number) { 
    this.currentPage = page;
    this.getPlates();
  }

}
