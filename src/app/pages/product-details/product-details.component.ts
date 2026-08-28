import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  related: Product[] = [];
  quantity = 1;
  loading = true;
  inWishlist = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.loading = true;
      this.quantity = 1;
      this.productService.getById(id).subscribe((product) => {
        this.product = product;
        this.loading = false;
        this.inWishlist = this.wishlistService.isInWishlist(product.id);
        this.productService.getByCategory(product.category).subscribe((items) => {
          this.related = items.filter((i) => i.id !== product.id).slice(0, 4);
        });
      });
    });
  }

  increase(): void {
    this.quantity++;
  }

  decrease(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.add(this.product, this.quantity);
    }
  }

  toggleWishlist(): void {
    if (this.product) {
      this.wishlistService.toggle(this.product);
      this.inWishlist = this.wishlistService.isInWishlist(this.product.id);
    }
  }
}
