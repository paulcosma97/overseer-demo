import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import ProductSearch from '../../shared/models/product-search.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  searches$: Observable<ProductSearch>;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.searches$ = this.auth.getHistory();
  }

}
