import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  stats = [
    { value: '10.5k', label: 'Sallers active our site' },
    { value: '33k', label: 'Mopnthly Produduct Sale', highlight: true },
    { value: '45.5k', label: 'Customer active in our site' },
    { value: '25k', label: 'Anual gross sale in our site' },
  ];

  team = [
    { name: 'Tom Cruise', role: 'Founder & Chairman' },
    { name: 'Emma Watson', role: 'Managing Director' },
    { name: 'Will Smith', role: 'Product Designer' },
  ];
}
