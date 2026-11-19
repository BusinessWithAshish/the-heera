@AGENTS.md

# The Heera website

Shop site for The Heera (hand-embellished women's heels, flats, platforms and bags, made in India). It will replace the Wix site at https://www.theheera.in.
The person editing this is not a developer. They ask in plain words ("make the banner pink", "add a new bag"). Make the change, check it, and explain what changed in one or two plain sentences. No jargon.

## Where things live
- **Products:** `src/data/products.json`, one entry per product (slug, name, category, price, compareAtPrice, inStock, summary, details, images). Adding, editing, repricing or marking sold out happens only here.
  - `category` must be `heels`, `flats`, `platforms` or `bags`.
  - `compareAtPrice` is the old struck-through price, or `null`. Only set it when the owner gives one.
- **Product photos:** `public/images/products/<slug>-<n>.webp`. The first photo is the main one. A new photo the owner shares must be saved here and listed in that product's `images`.
- **Category names, blurbs and the home page picks:** `src/lib/catalog.ts` (`categories`, `featuredSlugs`, `eveningSlugs`).
- **Brand facts, shipping days, exchange days, Instagram and email:** `src/config/site.ts`.
- **Pages:** `src/app/` (home `page.tsx`, `shop/`, `products/[slug]/`, `faq/`, `shipping-returns/`, `contact/`).
- **Look and feel:** colours in `src/app/globals.css` (ivory, espresso, `gold`, `blush`; `class="dark"` gives a dark band). The fonts are Cormorant Garamond for headings and Jost for text, set in `src/app/layout.tsx`.
- **Old site snapshot:** `reference/current-site/`. It's source material only.

## Ordering
There's no cart yet. Buttons send shoppers to an Instagram DM or a pre-filled email. Don't add a cart or payments unless the owner asks for one, since that's a separate decision.

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

## How to work with the owner (always follow)
- **Plain English only.** No technical words in replies (no "branch", "commit", "merge", "build", "deploy", file names or code) unless the owner uses them first. Talk like a friendly person, not a developer.
- **Keep replies small and simple.** A few short sentences or a short list.
- **Every change gets a preview.** After each change: check it, save it, send it to GitHub, wait for Vercel to finish, then give the owner the preview link for that exact change (the Vercel link for that commit, not the live site link). Check the link opens before sharing it.
- **Never put changes live on your own.** Changes collect on the `updates` branch. Once the owner is happy, ask in plain words, e.g. "Shall I put this live on the website now, or wait and put it live together with your next changes?" Only after a clear yes, bring `updates` into `main`.
- **Simple branch names.** Use short, plain names that say what they are (`updates` for changes waiting to go live). Never long or random names.

