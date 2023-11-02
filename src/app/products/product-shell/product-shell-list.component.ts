import {Component, OnDestroy, OnInit} from '@angular/core';

import {IProduct} from '../product';
import {ProductService} from '../product.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy{
  pageTitle = 'Products';
  products: IProduct[] = [];
  errorMessage = '';
  selectedProduct: IProduct | null;

  sub: Subscription;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => this.products = products,
      error: err => this.errorMessage = err
    });
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    )
  }

  onSelected(product: IProduct): void {
    this.productService.changeSelectedProduct(product);
  }

  ngOnDestroy() {
  this.sub.unsubscribe();
  }

}
