import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  products;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products = this.productsService.products;
  }

}
