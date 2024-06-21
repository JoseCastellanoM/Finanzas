import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { CustomerRegisterComponent } from './component/customer-register/customer-register.component';
import { ConfigurationComponent } from './component/configuration/configuration.component';
import { CashRegisterComponent } from './component/cash-register/cash-register.component';
import { PurchaseRegisterComponent } from './component/purchase-register/purchase-register.component';
import { PaymentRegisterComponent } from './component/payment-register/payment-register.component';
import { OperationsListComponent } from './component/operations-list/operations-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'ingresar', pathMatch: 'full'},
  { path: 'ingresar', component: LoginComponent },
  { path: 'configuracion', component: ConfigurationComponent },
  { path: 'registrar-cliente', component: CustomerRegisterComponent },
  {
    path: 'caja', component: CashRegisterComponent,
    children: [
      { path: '', redirectTo: 'registrar-compra', pathMatch: 'full' },
      { path: 'registrar-compra', component: PurchaseRegisterComponent },
      { path: 'registrar-pago', component: PaymentRegisterComponent }
    ]
  },
  { path: 'operaciones', component: OperationsListComponent,
    children: [
      { path: 'list/:id', component: OperationsListComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
