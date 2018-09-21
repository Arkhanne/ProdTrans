import { Component, OnInit } from '@angular/core';

import { TranstactionsService } from '../../services/transtactions.service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent implements OnInit {
  rates = [];
  transactions = [];

  constructor(private transactionsSrv: TranstactionsService) { }

  ngOnInit() {
    this.transactionsSrv.ratesChange$.subscribe((rates) => {
      this.rates = rates;
    });

    this.transactionsSrv.transactionsChange$.subscribe((transactions) => {
      this.transactions = transactions;
    });

    this.transactionsSrv.getRates();
    this.transactionsSrv.getTransactions();
  }

}
