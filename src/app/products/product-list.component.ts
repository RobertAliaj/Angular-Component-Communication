import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {IProduct} from './product';
import {ProductService} from './product.service';
import {CriteriaComponent} from "../shared/criteria/criteria.component";
import {ProductParameterService} from "./product-parameter.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // showImage = false;
  pageTitle = 'Product List';
  includeDetail: boolean = true;
  parentListFilter: string;

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }

  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }


  constructor(private productService: ProductService,
              private productParameterService: ProductParameterService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filterComponent.listFilter = this.productParameterService.filterBy;
      },
      error: err => this.errorMessage = err
    });
  }

  onValueChange(value: string): void {
    this.productParameterService.filterBy = value;
    this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
