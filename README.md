# ConTesta website

The ConTesta marketing site, built with [Astro](https://astro.build) from the owner's design (`design/design-html.html`).

- One page in 6 languages: Spanish at `/`, plus `/en/`, `/it/`, `/de/`, `/fr/` and `/he/` (right to left).
- Every page is plain HTML generated at build time, so search engines read all the text. JavaScript only adds the motion: the hero bust, marquees, case dialog, globe, process path, FAQ and the contact form.
- Animations use [GSAP](https://gsap.com) + ScrollTrigger. Fonts (Host Grotesk, Heebo) are self-hosted.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/
```

## Where things live

| What | File |
| --- | --- |
| All texts in 6 languages, cases, services, team, FAQ, contact details | `src/data/content.js` |
| Page titles and descriptions per language | `src/data/meta.js` |
| HTML of each section | `src/lib/render.js` |
| Page layout | `src/components/Home.astro` |
| Motion and interaction | `src/scripts/main.js` |
| Styles and colour tokens | `src/styles/site.css` (tokens at the top, in `:root`) |
| Images | `public/img/` |

To add a case, a press logo or a client logo, add the image under `public/img/` and a line to the matching list in `src/data/content.js`.

## Contact form

Set `PUBLIC_FORM_ENDPOINT` (see `.env.example`) to a form service such as Formspree. Without it, the form opens the visitor's email app with the message filled in, like the original design.

## Deploy

Any static host works (Netlify, Vercel, Cloudflare Pages): build command `npm run build`, output folder `dist`.
