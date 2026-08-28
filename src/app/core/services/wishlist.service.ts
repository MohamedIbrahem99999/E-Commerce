import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

const STORAGE_KEY = 'exclusive_wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private itemsSubject = new BehaviorSubject<Product[]>(this.load());
  items$ = this.itemsSubject.asObservable();

  private load(): Product[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private persist(items: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  get value(): Product[] {
    return this.itemsSubject.value;
  }

  isInWishlist(id: number): boolean {
    return this.value.some((p) => p.id === id);
  }

  toggle(product: Product): void {
    if (this.isInWishlist(product.id)) {
      this.persist(this.value.filter((p) => p.id !== product.id));
    } else {
      this.persist([...this.value, product]);
    }
  }

  remove(id: number): void {
    this.persist(this.value.filter((p) => p.id !== id));
  }

  get count(): number {
    return this.value.length;
  }
}
