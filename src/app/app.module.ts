import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PaymentsComponent } from './payments/payments.component';
import { LoansComponent } from './loans/loans.component';


@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    LoansComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
