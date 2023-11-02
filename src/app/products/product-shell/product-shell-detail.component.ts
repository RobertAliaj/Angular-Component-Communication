import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {IProduct} from '../product';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'pm-product-shell-detail',
  templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Detail';

  product: IProduct | null;

  errorMessage = '';

  constructor(private productService: ProductService) {
  }

  sub: Subscription;

  ngOnInit() {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.product = selectedProduct
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
