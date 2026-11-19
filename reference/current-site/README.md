# Current site (theheera.in), captured 2026-11-19

Snapshot of the old Wix store, kept as source material for the redesign. Reuse its content and products, not its design. Don't ship this folder as site code.

- `screens/`: full-page screenshots of every page, desktop (1440px) and mobile (390px)
- `pages.json`: text and links of each page
- `products.json`: all 30 products with name, description, price, stock and image URLs (images are still hosted on Wix)

## What's on it
- **Brand:** "The Heera" / "Heera Luxe". Luxury embellished women's heels, flats, platforms and bags, made in India. Instagram @theheera.in, email info@theheera.in.
- **Nav:** Home, Shop Footwear (`/shop`), Shop Bags (`/shop-1`), Shipping & Returns, Contact, FAQ (`/blank-3`), My Addresses.
- **Home:** "Coming soon / enters a new chapter" banner, Shop by Type (Luxe Heels, Bling Bags, Flats, Platforms), Featured Collection carousel, Bestseller, "Click to Steal the Look" (product next to an influencer photo), About Us, and a "Babes of Heera" customer photo grid.
- **Products:** 30 items, ₹799 to ₹2,299. Most show a struck-through "regular" price. Sizes are Euro. 2 are out of stock (Crystal Ocean Flats, Bejewelled Tan Flats).
- **Policies:** free shipping in India, ships in 1-2 days, delivered in 3-7 days.

## Problems to fix in the rebuild
- **The return policy contradicts itself.** Shipping & Returns says no returns and size exchanges within 4 days. The FAQ says returns within 5 days in one answer and 3 days in another. The owner has to pick one before launch.
- The home page has a large empty gap under "HEERA LUXE" (an embed that doesn't load).
- The bags page URL is `/shop-1` and the FAQ is `/blank-3`. Both need real URLs, with redirects from the old ones.
- The footer still says ©2023.
- The store needs a cart and checkout, which the new Next.js site doesn't have yet. This is an open decision.
