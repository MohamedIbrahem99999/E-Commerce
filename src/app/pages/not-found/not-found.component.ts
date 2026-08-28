import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container not-found">
      <div class="breadcrumb"><a routerLink="/">Home</a> / <span class="current">404 Error</span></div>
      <div class="content">
        <h1>404 Not Found</h1>
        <p>Your visited page not found. You may go home page.</p>
        <a routerLink="/" class="btn btn-primary">Back to home page</a>
      </div>
    </div>
  `,
  styles: [
    `
    .not-found { text-align: center; padding-bottom: 100px; }
    .content { padding: 60px 0; }
    h1 { font-size: 90px; margin: 0 0 20px; }
    p { color: var(--color-gray); margin-bottom: 40px; }
    `,
  ],
})
export class NotFoundComponent {}
