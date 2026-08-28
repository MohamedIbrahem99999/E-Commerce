import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

const STORAGE_KEY = 'exclusive_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this.itemsSubject.asObservable();

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private persist(items: CartItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  get value(): CartItem[] {
    return this.itemsSubject.value;
  }

  add(product: Product, quantity = 1): void {
    const items = [...this.value];
    const existing = items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.persist(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    const items = this.value
      .map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      .filter((i) => i.quantity > 0);
    this.persist(items);
  }

  remove(productId: number): void {
    this.persist(this.value.filter((i) => i.product.id !== productId));
  }

  clear(): void {
    this.persist([]);
  }

  get count(): number {
    return this.value.reduce((sum, i) => sum + i.quantity, 0);
  }

  get subtotal(): number {
    return this.value.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
  }
}
