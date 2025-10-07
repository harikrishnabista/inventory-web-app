import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface PaymentSource {
  paymentSourceName: string;
  accNumber: string;
}

@Component({
  selector: 'app-payment-option-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './PaymentOptionList.component.html',
  styleUrls: ['./PaymentOptionList.component.css']
})
export class PaymentOptionListComponent {
  paymentSources: PaymentSource[] = [
    { paymentSourceName: 'Bank of America', accNumber: '****1234' },
    { paymentSourceName: 'Chase', accNumber: '****5678' },
    { paymentSourceName: 'PayPal', accNumber: '****9012' }
  ];
}
