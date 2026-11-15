# Yash Gautam Portfolio

A cinematic, editorial portfolio for Yash Gautam built with React, Vite, TypeScript, Tailwind CSS, and lightweight CSS/Intersection Observer motion.

## Stack
- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide React

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

## Deployment
The Vite app can be hosted on Vercel or another static host. Public GitHub, LinkedIn, and email links are set, and this workspace has a local Formspree endpoint; project demos and a production domain have not been supplied. Configure the endpoint in the host's environment settings before deploying.

### Vercel
1. Push the repo to GitHub.
2. Import the repo into Vercel.
3. Keep the default Vite project settings.
4. Add the `VITE_FORMSPREE_ENDPOINT` environment variable in the project settings using the endpoint from your own Formspree form, and set the production domain and social preview metadata.
5. Run `npm run lint` and `npm run build`, then deploy.

## Customize content
Update portfolio data in `src/data/site.ts`; the page structure is in `src/App.tsx`, with global and component styling in `src/index.css` and `src/App.css`. Reveal motion uses the browser's Intersection Observer and CSS transitions; it respects reduced-motion preferences and has a visible-content fallback.

Project cards and the interactive architecture explorer use the centralized entries in `src/data/site.ts`. BrandGuard (the CodeNexus repository), NPC, and Context-Surgeon have source-inspected summaries; CHRONOS-X, JARVIS, and AgriTech remain concept/prototype directions because their implementation details have not been independently reviewed. All six cards retain their configured GitHub links regardless of source-inspection status.

All six cards use locally stored SVG illustrations in `public/project-art/`. The NPC and Context-Surgeon artwork is preserved; the four other project visuals were created to match it. These are portfolio illustrations, not repository screenshots. No live demo URLs are supplied.

### Project-card pointer interaction

All six project cards use the same pointer-event handler and update card-local CSS variables directly, without React state updates. Fine mouse pointers move a subtle, project-tinted spotlight and artwork parallax; leaving a card resets its pointer and tilt values. Keyboard focus receives a visible card treatment, touch devices do not receive pointer tracking, and reduced-motion preferences disable the movement and animation.

## Validation commands

Available scripts are `npm run lint` and `npm run build`; this project does not currently define an automated test script. Browser interaction checks and responsive checks are recorded in `FINAL_AUDIT.md`. Run `npm audit --audit-level=high` to check dependencies.

## Contact form configuration (Formspree)
The contact form uses Formspree's AJAX endpoint. This workspace has a configured endpoint in the ignored `.env.local` file; the endpoint is intentionally not committed. A fresh checkout or production host needs its own `VITE_FORMSPREE_ENDPOINT` value, or the form will show the email fallback.

1. Create an account at [Formspree](https://formspree.io/).
2. In the Formspree dashboard, create a form and complete any recipient verification it requires.
3. Copy the submission endpoint shown for that form. Do not use a placeholder endpoint.
4. If `.env.local` does not already exist, create it in the project root (next to `package.json`) and add:
```bash
VITE_FORMSPREE_ENDPOINT=
```
5. Paste the endpoint you copied after the equals sign. `.env.local` is ignored by Git and must not be committed. The same variable name must be set in your hosting provider's environment settings for production.
6. Restart the Vite development server after editing the file, then run `npm run dev`. Vite reads the endpoint at build time.

To test a successful submission, send a test message through the form and confirm it appears in the Formspree dashboard and reaches the configured recipient mailbox. The site only displays success after Formspree returns a successful response. To check error handling, temporarily use an unavailable endpoint in a local-only `.env.local`, reload the app, and submit a test message; the error should be announced, values retained, and retry enabled. Restore the actual endpoint afterward. Do not interpret a local mock or a successful HTTP response from another service as proof of email delivery.

Requests that do not complete within 15 seconds are aborted and shown as retryable failures; the entered values are retained.

## Attribution
- Icons: Lucide React
- Styling: Tailwind CSS and custom CSS
- Scroll reveals: Intersection Observer
