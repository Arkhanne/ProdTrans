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

  private getRates() {
    if (this.rates.length === 0) {
      this.httpClient.get('https://www.json-generator.com/api/json/get/bVviQgqKiG?indent=2', this.options).toPromise()
      .then((data: any) => {
        this.rates = data;
        localStorage.removeItem('Rates');
        localStorage.setItem('Rates', JSON.stringify(this.rates));
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  private getTransactions() {
    if (this.transactions.length === 0) {
      this.httpClient.get('https://www.json-generator.com/api/json/get/bTzgmQbyqa?indent=2', this.options).toPromise()
      .then((data: any) => {
        this.transactions = data;
        localStorage.removeItem('Transactions');
        localStorage.setItem('Transactions', JSON.stringify(this.transactions));
        this.loadProducts();
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      this.loadProducts();
    }
  }

  private loadProducts() {
    this.products = [];
    this.transactions.forEach(transaction => {
      const productFound = this.products.find((prod) => {
        return prod.name === transaction.sku;
      });

      if (productFound) {
        productFound.addTransaction({amount: transaction.amount, currency: transaction.currency}, this.rates);
      } else {
        const product = new Product(transaction.sku);
        product.addTransaction({amount: transaction.amount, currency: transaction.currency}, this.rates);
        this.products.push(product);
      }
    });

    localStorage.removeItem('Products');
    localStorage.setItem('Products', JSON.stringify(this.products));

    this.productsChange.next(this.products);
  }

  getProduct(name) {
    this.refresh();

    const productFound = this.products.find((prod) => {
      return prod.name === name;
    });

    return productFound;
  }

  private refresh() {
    this.rates = JSON.parse(localStorage.getItem('Rates'));
    this.transactions = JSON.parse(localStorage.getItem('Transactions'));
    this.products = JSON.parse(localStorage.getItem('Products'));
  }

  loadData() {
    this.getRates();
    this.getTransactions();
  }
}
