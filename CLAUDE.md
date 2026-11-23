@AGENTS.md

# The Heera website

Shop site for The Heera (hand-embellished women's heels, flats, platforms and bags, made in India). It will replace the Wix site at https://www.theheera.in.
The person editing this is not a developer. They ask in plain words ("make the banner pink", "add a new bag"). Make the change, check it, and explain what changed in one or two plain sentences. No jargon.

## Where things live
- **Products:** `src/data/products.json`, one entry per product (slug, name, category, price, compareAtPrice, inStock, summary, details, images). Adding, editing, repricing or marking sold out happens only here.
  - `category` must be `heels`, `flats`, `platforms` or `bags`.
  - `compareAtPrice` is the old struck-through price, or `null`. Only set it when the owner gives one.
- **Home page photos and words** (sliding banner `slides`, promises, "Shop the house" `categoryTiles`, "Everyday glamour", the 3D "On the rail" `rail`, the Crystal Edit row `editRow`, the Bestsellers photo `bestsellerFeature`, `reels`, `lovedByYou`, founder message, top announcement): `src/config/home.ts`, photos in `public/images/home/`. To swap a photo, replace the file with the same name. Reel videos go in `public/videos/` and their path in that reel's `video`. On bigger screens the founder section is the owner's own picture (`founder-message.webp`), shown as sent except that "The Heera" in it (and in the phone poster and phone founder picture) was redrawn as "Heera Luxe"; the untouched originals are what the owner sent, so ask for new files rather than re-editing.
- **Top banner:** the silver crystal bag clip in arched gold "shop windows" (`src/components/vitrine-hero.tsx`, words and clip under `hero` in `src/config/home.ts`, styles in `globals.css` under "Home banner"). Three designs: `arch` (one window), `full` (blurred clip across the banner, sharp clip on the right) and `trio` (three windows). While `hero.compare` is `true` a small switcher shows at the bottom of the page; when the owner picks one, set `design` to it and `compare` to `false`. The clip is two files in `public/videos/` (`hero-bag-1080.mp4` for bigger screens, `hero-bag-720.mp4` for phones, both 60 fps). The old sliding banner (`hero-slider.tsx`, `slides`) is no longer on the home page.
- **Scroll effects:** sections rise in, photos open like a curtain and the category photos drift slower than the page. They are CSS classes `reveal`, `reveal-stagger` (for grids), `reveal-clip`, `parallax-img` and `reveal-band` at the end of `globals.css`; add one to a section to give it the same effect. Computers also get smooth, gliding scrolling (`src/components/smooth-scroll.tsx`, the Lenis library). All of it is off for shoppers who turn motion off.
- **Opening screen:** a short gold animation with the logo (`src/components/splash-screen.tsx`, styles at the end of `globals.css`). It shows once per visit, a tap skips it, and it never shows for shoppers who turn motion off.
- **On the rail:** ten pieces on gold hangers in 3D on the home page (`src/components/heera-rail.tsx`). Which pieces, in order: `railSlugs` in `src/lib/catalog.ts`.
- **Phone layout:** phones use the same home page sections as bigger screens, stacked (Everyday glamour and the big Bestsellers photo are hidden on phones). The line under the logo in the phone footer is `home.mobile.tagline`. The founder section shows the owner's tall picture on phones (`founder-message-mobile.webp`). The footer (`src/components/site-footer.tsx`) starts with a strip of four promises worked out from `src/config/site.ts`, and folds its links into tap-to-open rows on phones. Leave the computer layout alone when the owner asks about phones.
- **Logo:** `public/images/brand/heera-luxe-logo.webp` (header/footer) and `heera-luxe-logo-full.webp`. Both are light on a see-through background, so use them on dark bands only.
- **Product photos:** `public/images/products/<slug>-<n>.webp`. The first photo is the main one. A new photo the owner shares must be saved here and listed in that product's `images`.
- **Category names, blurbs, home page picks, product order and the edits:** `src/lib/catalog.ts` (`categories`, `footwear` for the /shop/footwear page, `newInSlugs`, `bestsellerSlugs`, `popularity`, `edits`). Every product list follows `popularity`; never label it as "sorted by popularity" on the site.
- **Brand facts, shipping days, exchange days, Instagram and email:** `src/config/site.ts`.
- **Pages:** `src/app/` (home `page.tsx`, `shop/`, `products/[slug]/`, `faq/`, `shipping-returns/`, `contact/`).
- **Look and feel:** colours in `src/app/globals.css` (ivory, near-black, rose-`gold`, `espresso`, `blush`; `class="dark"` gives a dark band). The fonts are Cormorant Garamond for headings, Jost for text and Allura (`font-script`) for the odd handwritten word, set in `src/app/layout.tsx`.
- **Old site snapshot:** `reference/current-site/`. It's source material only.

## Ordering
- Shoppers add pieces to a bag (`src/lib/cart.tsx`, kept in their browser) from the product page, then check out at `/checkout` (`src/components/checkout-view.tsx`).
- `/api/checkout` checks the order and works out the total from `products.json`. Online payment isn't connected yet: after "Place order" the shopper sends the order to us by email or Instagram. The payment gateway the owner picks plugs into that route.
- Footwear sizes offered are `footwearSizes` in `src/config/site.ts`.

## Stack (do not swap any of these)
- Next.js 16 App Router, TypeScript, `src/` layout. Read `node_modules/next/dist/docs/` before using a Next API you're unsure of.
- Tailwind CSS 4. Theme tokens live in `src/app/globals.css`, not a tailwind config file.
- shadcn/ui (base-nova style on Base UI). All components are already in `src/components/ui/`. Use them before writing custom UI. Don't edit files in `ui/` to restyle one page; pass `className` instead.
- Axios: every request goes through `api` in `src/lib/api.ts`. Show errors with `apiErrorMessage`.
- Zod + react-hook-form: schemas live in `src/lib/schemas.ts` and are shared by the form and the route handler. Copy the pattern in `src/components/contact-form.tsx`.
- Toasts: `toast.add({ type, title })` from `@/components/ui/toast`.
- Icons: `lucide-react`.

## Rules
- Brand facts (name, tagline, URL, contacts) live in `src/config/site.ts`. Don't hard-code them.
- Mobile first. Most shoppers are on phones, so check every change at 375px width.
- Use `next/image` for every image. Put images in `public/images/`.
- Keep copy honest. Never invent prices, discounts, reviews or stock.
- Before you finish, run `npm run lint` and `npm run build`. Both must pass.
- Commit with a short plain message describing what changed for the shopper.

## Deploy
Vercel builds every push. A branch or PR gets a preview link, and `main` is the live site.
