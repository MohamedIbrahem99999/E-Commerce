import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  items: Product[] = [];
  suggestions: Product[] = [];

  constructor(
    public wishlistService: WishlistService,
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.wishlistService.items$.subscribe((items) => (this.items = items));
    this.productService.getLimited(4).subscribe((products) => (this.suggestions = products));
  }

  remove(id: number): void {
    this.wishlistService.remove(id);
  }

  addToCart(product: Product): void {
    this.cartService.add(product, 1);
  }

  moveAllToBag(): void {
    this.items.forEach((p) => this.cartService.add(p, 1));
  }
}
