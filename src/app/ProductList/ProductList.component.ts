import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, FormsModule],
  templateUrl: './ProductList.component.html',
  styleUrls: ['./ProductList.component.css']
})
export class ProductListComponent {
  products: Product[] = [];

  // add form model
  title = '';
  price: number | null = null;
  description = '';

  // edit state
  editingId: number | null = null;
  editTitle = '';
  editPrice: number | null = null;
  editDescription = '';

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<Product[]>('http://localhost:3000/products')
      .subscribe(data => this.products = data, err => console.error('Failed to load products', err));
  }

  addProduct() {
    if (!this.title || this.price == null) return;
    const payload = { title: this.title, price: this.price, description: this.description } as Partial<Product>;
    this.http.post<Product>('http://localhost:3000/products', payload)
      .subscribe(created => {
        if (created) this.products = [...this.products, created];
        this.title = '';
        this.price = null;
        this.description = '';
      }, err => console.error('Failed to add product', err));
  }

  startEdit(p: Product) {
    this.editingId = p.id;
    this.editTitle = p.title;
    this.editPrice = p.price;
    this.editDescription = p.description || '';
  }

  cancelEdit() {
    this.editingId = null;
    this.editTitle = '';
    this.editPrice = null;
    this.editDescription = '';
  }

  saveEdit(p: Product) {
    if (this.editingId !== p.id) return;
    const updated = { id: p.id, title: this.editTitle, price: this.editPrice ?? 0, description: this.editDescription } as Product;
    this.http.put<Product>(`http://localhost:3000/products/${p.id}`, updated)
      .subscribe(resp => {
        // refresh list
        this.loadProducts();
        this.cancelEdit();
      }, err => console.error('Failed to update product', err));
  }

  deleteProduct(p: Product) {
    if (!confirm(`Delete ${p.title}?`)) return;
    this.http.delete(`http://localhost:3000/products/${p.id}`)
      .subscribe(() => this.products = this.products.filter(x => x.id !== p.id),
        err => console.error('Failed to delete product', err));
  }
}
