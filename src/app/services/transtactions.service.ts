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
  private rates = [];
  private transactions = [];
  private products = [];
  // private ratesChange: Subject<any> = new Subject();
  // private transactionsChange: Subject<any> = new Subject();
  private productsChange: Subject<any> = new Subject();

  // ratesChange$: Observable<any> = this.ratesChange.asObservable();
  // transactionsChange$: Observable<any> = this.transactionsChange.asObservable();
  productsChange$: Observable<any> = this.productsChange.asObservable();

  constructor(private httpClient: HttpClient) { }

  getRates() {
    this.httpClient.get('https://www.json-generator.com/api/json/get/bVviQgqKiG?indent=2', this.options).toPromise()
      .then((data: any) => {
        this.rates = data;
        // this.ratesChange.next(this.rates);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getTransactions() {
    this.httpClient.get('https://www.json-generator.com/api/json/get/bTzgmQbyqa?indent=2', this.options).toPromise()
      .then((data: any) => {
        this.transactions = data;
        // this.transactionsChange.next(this.transactions);
        this.loadProducts();
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadProducts() {
    this.transactions.forEach(transaction => {
      if (!this.products.includes(transaction.sku)) {
        this.products.push(transaction.sku);
      }
    });

    this.productsChange.next(this.products);
  }
}
