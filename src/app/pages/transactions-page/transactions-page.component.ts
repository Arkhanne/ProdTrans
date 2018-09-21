import { Component, OnInit } from '@angular/core';

import { TransactionsService } from '../../services/transtactions.service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent implements OnInit {
  // rates = [];
  // transactions = [];
  products = [];

  constructor(private transactionsSrv: TransactionsService) { }

  ngOnInit() {
    // this.transactionsSrv.ratesChange$.subscribe((rates) => {
    //   this.rates = rates;
    // });

    // this.transactionsSrv.transactionsChange$.subscribe((transactions) => {
    //   this.transactions = transactions;
    // });

    this.transactionsSrv.productsChange$.subscribe((products) => {
      this.products = products;
    });

    this.transactionsSrv.getRates();
    this.transactionsSrv.getTransactions();
  }

}
