import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  form: FormGroup;
  saved = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['Mohamed'],
      lastName: ['Ibrahem'],
      email: ['moibrahem.aboelenen@gmail.com'],
      address: ['Cairo, Egypt'],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  save(): void {
    this.saved = true;
    setTimeout(() => (this.saved = false), 2500);
  }
}
