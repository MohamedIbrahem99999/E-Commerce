import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe((items) => (this.items = items));
  }

  updateQuantity(productId: number, quantity: string): void {
    const qty = Number(quantity);
    if (qty >= 1) {
      this.cartService.updateQuantity(productId, qty);
    }
  }

  remove(productId: number): void {
    this.cartService.remove(productId);
  }

  get subtotal(): number {
    return this.cartService.subtotal;
  }
}
