# Edges In Motion — static demo storefront

The storefront is a fully static Next.js export for presentation purposes. It uses a bundled sample catalogue and local images, with no dependency on Railway, Medusa, a database or Stripe.

The original visual style and campaign homepage are retained. Visitors can browse categories and collections, search and filter products, sort by price, select sizes, and add, update or remove items in a bag that is saved in their browser. Checkout displays a demo summary; it collects no personal details, creates no orders and takes no payments. Account, shipping, terms and privacy pages explain the demo behaviour.

## Run locally

Requires Node.js 20 or newer and npm.

From the repository root:

```sh
npm ci --workspace=@dtc/storefront --include-workspace-root
npm run dev
```

Open http://localhost:8000. No environment file is required.

To build and preview the actual static files:

```sh
npm run build
npm start
```

The export is written to `apps/storefront/out/`. `npm start` only serves those files locally; there is no commerce server. If port 8000 is already in use, run `PORT=8011 npm start`.

```sh
npm run typecheck -w @dtc/storefront
```

## Deploy the demo to Vercel

Commit and push the changes, then redeploy the existing Vercel project.

Recommended project configuration:

| Setting | Value |
| --- | --- |
| Root Directory | `apps/storefront` |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `out` |

`apps/storefront/vercel.json` supplies the static framework, build and output settings. A root `vercel.json` also supports projects whose Root Directory is the repository root; its output directory is `apps/storefront/out`.

Remove any old dashboard overrides that conflict with those settings. There is no start command on Vercel: it serves the exported files.

No backend variables are required. Existing `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`, `NEXT_PUBLIC_STRIPE_KEY`, and Medusa Cloud image variables are ignored by the demo. They can be removed from Vercel. Optionally set `NEXT_PUBLIC_BASE_URL` to your deployed storefront URL and `NEXT_PUBLIC_DEFAULT_REGION` to the desired two-letter country prefix (defaults to `dk`). Country prefixes must be lowercase two-letter codes.

The homepage is available at `/` and each supported country prefix, with existing paths such as `/dk/store/`, `/dk/cart/`, and `/dk/checkout/`. DK, GB, US, DE, SE, FR, ES and IT are included, together with a custom default country if configured. All demo prices use one illustrative EUR price list. Unknown products and paths return a 404.

The same `out/` directory can be served by any static host supporting directory index files and a `404.html` error page. Next.js static export documentation: https://nextjs.org/docs/app/guides/static-exports

## Edit the demo catalogue

Edit `apps/storefront/src/lib/demo/catalog.ts` to change products, prices, sizes, categories or collections. Images live in `apps/storefront/public/images/demo/`, with the existing hero in `public/images/edges-in-motion-hero.png`. Sample product photography is from Unsplash and is illustrative, not a recovered copy of the original backend catalogue.

Rebuild and redeploy after catalogue changes. Cart data stays on the visitor's device and is validated against the catalogue when loaded. Clearing site storage deletes the saved bag.

The previous Medusa backend and unused commerce modules remain in the repository as source references. They are not imported by the demo pages, built by the root build command, or deployed with the static storefront. The original account, order and payment routes have been replaced by the demo route tree; restoring real commerce would require reconnecting those routes to a working backend.
