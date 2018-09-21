import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';

const routes: Routes = [
  { path: '',  component: TransactionsPageComponent },
  // { path: '**', component: E404PageComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    TransactionsPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
