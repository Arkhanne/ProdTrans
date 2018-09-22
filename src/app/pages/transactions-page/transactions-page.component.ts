import { Component, OnInit } from '@angular/core';

import { TransactionsService } from '../../services/transtactions.service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent implements OnInit {
  products = [];
  loading = true;

  constructor(private transactionsSrv: TransactionsService) { }

  ngOnInit() {
    this.transactionsSrv.productsChange$.subscribe((products) => {
      this.products = products;
      this.loading = false;
    });

    this.transactionsSrv.loadData();
  }
}
