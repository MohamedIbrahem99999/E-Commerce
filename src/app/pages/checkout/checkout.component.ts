import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];
  form: FormGroup;
  paymentMethod: 'bank' | 'cod' = 'cod';
  placedOrder = false;

  constructor(private fb: FormBuilder, private cartService: CartService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      companyName: [''],
      streetAddress: ['', Validators.required],
      apartment: [''],
      townCity: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      saveInfo: [true],
    });
  }

  ngOnInit(): void {
    this.cartService.items$.subscribe((items) => (this.items = items));
  }

  get subtotal(): number {
    return this.cartService.subtotal;
  }

  placeOrder(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.placedOrder = true;
    this.cartService.clear();
    setTimeout(() => this.router.navigate(['/']), 2000);
  }
}
