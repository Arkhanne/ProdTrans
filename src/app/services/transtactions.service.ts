import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranstactionsService {

  constructor(private httpClient: HttpClient) { }

  getRates() {
    const options = {
      withCredentials: true
    };

    this.httpClient.get('https://quiet-stone-2094.herokuapp.com/rates.json', options).toPromise()
      .then((data: any) => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
