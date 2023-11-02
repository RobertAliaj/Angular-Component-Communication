import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {IProduct} from '../product';
import {Observable} from "rxjs";

@Component({
  selector: 'pm-product-shell-detail',
  templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit {
  pageTitle = 'Product Detail';

  product: IProduct | null;

  errorMessage = '';

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.product = selectedProduct
    )
  }

}
