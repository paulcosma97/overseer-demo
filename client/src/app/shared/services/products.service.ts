import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import Product from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products: Subject<Product[]> = new Subject();

  constructor(private http: HttpClient) { }

  search(term: string, excludedTerms: string[]) {
    this.http.post<Product[]>('http://localhost:8000/search?term=' + term, excludedTerms).subscribe(data => this.products.next(data));
  }
}
