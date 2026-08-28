import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input({ required: true }) product!: Product;
  inWishlist = false;

  constructor(private cartService: CartService, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.items$.subscribe(() => {
      this.inWishlist = this.wishlistService.isInWishlist(this.product.id);
    });
  }

  addToCart(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.cartService.add(this.product, 1);
  }

  toggleWishlist(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.wishlistService.toggle(this.product);
  }
}
