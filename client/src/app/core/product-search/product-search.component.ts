import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../shared/services/products.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  @ViewChild('loading') loading: ElementRef;
  @ViewChild('excludedTerms') excludedTerms: ElementRef;
  excludedTermsInputShown = false;

  constructor(private http: HttpClient,
              private productsService: ProductsService,
              private authService: AuthService) { }

  onProductSearchEnter(event) {
    if (!this.loading) {
      return;
    }

    if (event.key !== 'Enter') {
      return;
    }

    this.onProductSearch({ target: { firstChild: { firstChild: { value: event.target.value } } } });
  }

  onProductSearch(event) {
    const value = event.target.firstChild.firstChild.value;

    if (!value) {
      return false;
    }

    this.productsService.products.next([]);
    this.loading.nativeElement.style.visibility = 'visible';

    let excludedTermsArray = [];
    if (this.excludedTerms) {
      excludedTermsArray = (this.excludedTerms.nativeElement as HTMLInputElement).value.split(',')
          .map(x => x.trim())
          .filter(x => x !== '');
    }

    this.productsService.search(value, excludedTermsArray);
    return false;
  }

  ngOnInit(): void {
    this.authService.tryLogin();
    this.productsService.products.subscribe(() => this.loading.nativeElement.style.visibility = 'hidden');
  }

  toggleExcludedTermsInput() {
    this.excludedTermsInputShown = !this.excludedTermsInputShown;
  }
}
