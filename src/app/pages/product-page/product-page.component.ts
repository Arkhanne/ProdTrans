import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TransactionsService } from '../../services/transtactions.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: String;

  constructor(private transactionsSrv: TransactionsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.product = params.id;
    });
  }

}
