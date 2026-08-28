# Exclusive – Angular E-commerce (Portfolio Project)

Angular 17 (standalone components) clone of the "Exclusive" e-commerce UI,
built with **real API data** from [Fake Store API](https://fakestoreapi.com)
instead of hardcoded data.

## Features
- Standalone Angular components + lazy-loaded routes (`app.routes.ts`)
- `ProductService` — fetches products/categories from Fake Store API via `HttpClient`
- `CartService` / `WishlistService` — RxJS `BehaviorSubject` state, persisted to `localStorage`
- Pages: Home, Product Details, Cart, Wishlist, Checkout, Login, Sign Up,
  Contact, About, My Account, 404
- Reactive Forms with validation (Login, Sign Up, Contact, Checkout, Account)
- Fully responsive layout, red/black "Exclusive" design language

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:4200

> This sandbox has no internet access, so `npm install` could not be run here.
> Run it on your machine (Node 18+ recommended) — everything else is ready to go.

## Project structure

```
src/app/
  core/
    models/        -> Product & CartItem interfaces
    services/       -> ProductService, CartService, WishlistService
  shared/components/
    header/         -> top bar, nav, search, cart/wishlist/account icons
    footer/
    product-card/    -> reusable product card (used in Home, Details, Wishlist)
  pages/
    home/ product-details/ cart/ wishlist/ checkout/
    login/ signup/ contact/ about/ account/ not-found/
```

## Notes for the portfolio write-up
- Data layer is fully decoupled from components via services (easy to swap
  Fake Store API for a real backend later).
- Cart/Wishlist state survives page refresh (localStorage).
- Routes are lazy-loaded (`loadComponent`) for smaller initial bundle.
