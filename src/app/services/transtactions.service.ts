import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranstactionsService {

  constructor(private httpClient: HttpClient) { }

  getRates() {
    const options = {
      withCredentials: false
    };

    this.httpClient.get('https://www.json-generator.com/api/json/get/bVviQgqKiG?indent=2', options).toPromise()
      .then((data: any) => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
