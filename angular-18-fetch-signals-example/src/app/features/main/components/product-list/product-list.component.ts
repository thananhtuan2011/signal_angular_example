import { Component, effect, inject, Input, input, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
 private service = inject(CategoryService);
 products = input.required<any>(); // này bằng với @Input
// @Input() products:any
 constructor() {
//   // Register a new effect.
//   effect(() => {
//     console.log(`The count is: ${this.service.state().data}`);
//   });
}
  ngOnInit(): void {
  
   console.log("products",this.products());
  }
  

  


}
