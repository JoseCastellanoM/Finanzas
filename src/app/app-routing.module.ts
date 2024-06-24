import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { CustomerRegisterComponent } from './component/customer-register/customer-register.component';
import { ConfigurationComponent } from './component/configuration/configuration.component';
import { CashRegisterComponent } from './component/cash-register/cash-register.component';
import { OperationsListComponent } from './component/operations-list/operations-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'ingresar', pathMatch: 'full'},
  { path: 'ingresar', component: LoginComponent },
  { path: 'configuracion', component: ConfigurationComponent },
  { path: 'registrar-cliente', component: CustomerRegisterComponent },
  { path: 'caja', component: CashRegisterComponent },
  { path: 'operaciones/:id', component: OperationsListComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
