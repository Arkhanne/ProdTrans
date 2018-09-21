import { Component, OnInit } from '@angular/core';

import { TranstactionsService } from '../../services/transtactions.service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent implements OnInit {

  constructor(private transactionsSrv: TranstactionsService) { }

  ngOnInit() {
    this.transactionsSrv.getRates();
  }

}
