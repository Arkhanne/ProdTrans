import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { Product } from '../components/product.component';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private options = {
    withCredentials: false
  };
  private rates = [];
  private transactions = [];
  private products = [];
  private productsChange: Subject<any> = new Subject();

  productsChange$: Observable<any> = this.productsChange.asObservable();

  constructor(private httpClient: HttpClient) { }

  getRates() {
    this.httpClient.get('https://www.json-generator.com/api/json/get/bVviQgqKiG?indent=2', this.options).toPromise()
      .then((data: any) => {
        this.rates = data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getTransactions() {
    this.httpClient.get('https://www.json-generator.com/api/json/get/bTzgmQbyqa?indent=2', this.options).toPromise()
      .then((data: any) => {
        this.transactions = data;
        this.loadProducts();
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadProducts() {
    if (this.products.length === 0) {
      this.transactions.forEach(transaction => {
        const productFound = this.products.find((prod) => {
          return prod.name === transaction.sku;
        });

        if (productFound) {
          productFound.addTransaction({amount: transaction.amount, currency: transaction.currency});
        } else {
          const product = new Product(transaction.sku);
          product.addTransaction({amount: transaction.amount, currency: transaction.currency});
          this.products.push(product);
        }
      });
    }

    this.productsChange.next(this.products);
  }

  getProduct(name) {
    const productFound = this.products.find((prod) => {
      return prod.name === name;
    });

    return productFound;
  }
}
