import { Component, OnInit } from '@angular/core';
import Product from '../../shared/models/product.model';
import {Observable} from 'rxjs';
import {ProductsService} from '../../shared/services/products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  private products;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products = this.productsService.products;
  }

}
