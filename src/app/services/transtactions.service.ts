import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranstactionsService {
  private options = {
    withCredentials: false
  };
  private rates;
  private transactions;
  private ratesChange: Subject<any> = new Subject();
  private transactionsChange: Subject<any> = new Subject();

  ratesChange$: Observable<any> = this.ratesChange.asObservable();
  transactionsChange$: Observable<any> = this.transactionsChange.asObservable();

  constructor(private httpClient: HttpClient) { }

  getRates() {
    this.httpClient.get('https://www.json-generator.com/api/json/get/bVviQgqKiG?indent=2', this.options).toPromise()
      .then((data: any) => {
        this.rates = data;
        this.ratesChange.next(this.rates);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getTransactions() {
    this.httpClient.get('https://www.json-generator.com/api/json/get/bTzgmQbyqa?indent=2', this.options).toPromise()
      .then((data: any) => {
        this.transactions = data;
        this.transactionsChange.next(this.transactions);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
