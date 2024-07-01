import { Component } from '@angular/core';
import { SellPlatesComponent } from '../sell-plates/sell-plates.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [SellPlatesComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {

}
