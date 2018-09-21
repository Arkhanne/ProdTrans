import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [
  { path: '',  component: TransactionsPageComponent },
  // { path: '**', component: E404PageComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    TransactionsPageComponent,
    ProductsListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
