import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentOptionListComponent } from './PaymentOptionList/PaymentOptionList.component';
import { HomeComponent } from './HomeComponent/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaymentOptionListComponent, HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
