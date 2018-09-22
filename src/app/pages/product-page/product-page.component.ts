import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TransactionsService } from '../../services/transtactions.service';
import { Product } from '../../components/product.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: Product;
  amountsColumnsToDisplay = ['currency', 'qty', 'amount'];
  transactionsColumnsToDisplay = ['currency', 'amount'];

  constructor(private transactionsSrv: TransactionsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.product = this.transactionsSrv.getProduct(params.id);
    });
  }
}
