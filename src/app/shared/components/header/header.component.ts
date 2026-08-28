import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  cartCount = 0;
  wishlistCount = 0;
  accountMenuOpen = false;
  searchTerm = '';

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe(() => (this.cartCount = this.cartService.count));
    this.wishlistService.items$.subscribe(() => (this.wishlistCount = this.wishlistService.count));
  }

  toggleAccountMenu(): void {
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  onSearch(): void {
    this.router.navigate(['/'], { queryParams: { q: this.searchTerm || null } });
  }
}
