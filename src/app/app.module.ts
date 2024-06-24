import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { CustomerRegisterComponent } from './component/customer-register/customer-register.component';
import { ConfigurationComponent } from './component/configuration/configuration.component';
import { CashRegisterComponent } from './component/cash-register/cash-register.component';
import { PurchaseRegisterComponent } from './component/purchase-register/purchase-register.component';
import { PaymentRegisterComponent } from './component/payment-register/payment-register.component';
import { OperationsListComponent } from './component/operations-list/operations-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerRegisterComponent,
    ConfigurationComponent,
    CashRegisterComponent,
    PurchaseRegisterComponent,
    PaymentRegisterComponent,
    OperationsListComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    //RouterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
