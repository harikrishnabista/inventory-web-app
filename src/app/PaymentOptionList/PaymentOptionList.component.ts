import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface PaymentSource {
  id: number;
  name: string;
  accountNumber: string;
}

@Component({
  selector: 'app-payment-option-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './PaymentOptionList.component.html',
  styleUrls: ['./PaymentOptionList.component.css']
})

export class PaymentOptionListComponent {
  paymentSources: PaymentSource[] = [];

  constructor(private http: HttpClient) {
    this.http.get<PaymentSource[]>('http://localhost:3000/payment-options')
      .subscribe(data => {
        this.paymentSources = data;
      });
  }
}
