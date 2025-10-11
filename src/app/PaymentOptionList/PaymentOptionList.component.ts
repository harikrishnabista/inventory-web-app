import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface PaymentSource {
  id: number;
  name: string;
  accountNumber: string;
}

@Component({
  selector: 'app-payment-option-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, FormsModule],
  templateUrl: './PaymentOptionList.component.html',
  styleUrls: ['./PaymentOptionList.component.css']
})

export class PaymentOptionListComponent {
  paymentSources: PaymentSource[] = [];
  // form model
  bankName = '';
  accountNumber = '';
  // edit state
  editingId: number | null = null;
  editName = '';
  editAccountNumber = '';

  constructor(private http: HttpClient) {
    this.loadPaymentSources();
  }

  loadPaymentSources() {
    this.http.get<PaymentSource[]>('http://localhost:3000/payment-options')
      .subscribe(data => {
        this.paymentSources = data;
      }, err => {
        console.error('Failed to load payment sources', err);
      });
  }

  addBank() {
    const payload = {
      name: this.bankName,
      accountNumber: this.accountNumber
    } as Partial<PaymentSource>;

    this.http.post<PaymentSource>('http://localhost:3000/payment-options', payload)
      .subscribe(created => {
        // push the created resource into the list and clear form
        if (created) {
          this.paymentSources = [...this.paymentSources, created];
        }
        this.bankName = '';
        this.accountNumber = '';
      }, err => {
        console.error('Failed to add payment source', err);
      });
  }

  startEdit(source: PaymentSource) {
    this.editingId = source.id;
    this.editName = source.name;
    this.editAccountNumber = source.accountNumber;
  }

  cancelEdit() {
    this.editingId = null;
    this.editName = '';
    this.editAccountNumber = '';
  }

  saveEdit(source: PaymentSource) {
    if (this.editingId !== source.id) return;

    const updated = {
      id: source.id,
      name: this.editName,
      accountNumber: this.editAccountNumber
    } as PaymentSource;

    this.http.put<PaymentSource>(`http://localhost:3000/payment-options/${source.id}`, updated)
      .subscribe(resp => {
        // refresh list from server to ensure consistency
        this.loadPaymentSources();
        this.cancelEdit();
      }, err => {
        console.error('Failed to update payment source', err);
      });
  }

  deleteBank(source: PaymentSource) {
    if (!confirm(`Delete ${source.name} - ${source.accountNumber}?`)) return;

    this.http.delete(`http://localhost:3000/payment-options/${source.id}`)
      .subscribe(() => {
        this.paymentSources = this.paymentSources.filter(s => s.id !== source.id);
        if (this.editingId === source.id) this.cancelEdit();
      }, err => {
        console.error('Failed to delete payment source', err);
      });
  }
}
