@AGENTS.md

# Heera Luxe website

Marketing site for Heera Luxe (luxury women's heels and bags, India). It will replace https://www.theheera.in.
The person editing this is not a developer. They ask in plain words ("make the banner pink", "add a new bag"). Make the change, check it, and explain what changed in one or two plain sentences. No jargon.

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
