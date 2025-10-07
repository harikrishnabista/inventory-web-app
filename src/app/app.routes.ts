import { Routes } from '@angular/router';
import { PaymentOptionListComponent } from './PaymentOptionList/PaymentOptionList.component';
import { HomeComponent } from './HomeComponent/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'payment-options', component: PaymentOptionListComponent },
];
