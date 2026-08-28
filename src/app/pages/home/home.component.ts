import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allProducts: Product[] = [];
  flashSales: Product[] = [];
  bestSelling: Product[] = [];
  exploreProducts: Product[] = [];
  categories: string[] = [];
  loading = true;
  error = '';
  searchTerm = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = (params.get('q') || '').toLowerCase();
      this.applySearch();
    });

    this.productService.getAll().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.flashSales = products.slice(0, 4);
        this.bestSelling = products.slice(4, 8);
        this.exploreProducts = products.slice(8, 16);
        this.loading = false;
        this.applySearch();
      },
      error: () => {
        this.error = 'Could not load products. Please try again later.';
        this.loading = false;
      },
    });

    this.productService.getCategories().subscribe((cats) => (this.categories = cats));
  }

  private applySearch(): void {
    if (!this.searchTerm) {
      return;
    }
    const filtered = this.allProducts.filter((p) => p.title.toLowerCase().includes(this.searchTerm));
    this.exploreProducts = filtered;
  }
}
