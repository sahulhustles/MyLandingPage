# Sahul Hameed — Personal Portfolio (Static site)

This repository contains a static portfolio website for Sahul Hameed. It showcases About, Education, Skills, Projects, Services and Contact pages, and includes small client-side enhancements for accessibility and performance.

The site is intentionally lightweight and static (HTML/CSS/JS). It uses icon fonts for convenience and a few inline SVG replacements for critical icons.

## Features
- Responsive single-site portfolio with separate pages: `index.html`, `about.html`, `education.html`, `skills.html`, `projects.html`, `services.html`, `contact.html`.
- Contact form using Formspree with client-side validation, auto-save (localStorage), progress indicator, and real-time validation (`scripts/contact.js`).
- Theme toggle (light/dark) persistence (`scripts/theme.js`).
- Skills animations and progress bars (`scripts/skills.js`).
- Accessibility and performance improvements added (see "Recent improvements").

## Recent improvements (non-design)
- Accessibility
	- Added a keyboard "Skip to main content" link on every page and landmark id (`id="main-content"`).
	- Added `.sr-only` helper and an `aria-live` polite region to announce contact form success/error messages for screen-reader users.
	- Visible focus styles using `:focus-visible` to help keyboard users navigate without changing the visual design.
- Performance
	- Added `rel="preconnect"` for the Font Awesome CDN and `rel="preload"` for the main stylesheet to improve perceived load time.
	- Replaced several high-impact Font Awesome icons with inline SVGs via `scripts/icons.js` to reduce dependency on the external CDN for critical icons.

These changes are intentionally small and non-visual to preserve the site's design while improving usability and perceived performance.

## Project structure
```
MyLandingPage/
	index.html
	about.html
	contact.html
	education.html
	projects.html
	services.html
	skills.html
	styles/
		main.css
		animations.css
	scripts/
		main.js
		theme.js
		contact.js
		skills.js
		icons.js        # Inline SVG replacer for a small set of icons
	public/
		favicon.ico
		placeholder.svg
		robots.txt
```

## How to run locally
This is a static site. You can open `index.html` directly in a browser, but for best results (and to avoid CORS issues with some browsers) run a simple local static server.

On Windows (PowerShell), from the repository root run one of the following:

Using Python 3:
```
python -m http.server 8000
```

Using Node.js (http-server, if installed):
```
npx http-server -p 8000
```

Then open http://localhost:8000 in your browser.

## Notes on the contact form
- The site uses Formspree for form submissions. If you want to host forms yourself, replace the `action` on the form in `contact.html` and implement a backend or serverless endpoint.
- The contact form includes client-side validation and an aria-live announcement region for screen-reader friendly feedback.

## How to extend or deploy
- Deploy as a static site on GitHub Pages, Netlify, Vercel, or any static host.
- To improve performance further, consider:
	- Converting the remaining used icons to inline SVG and removing the Font Awesome CDN completely.
	- Minifying CSS/JS and enabling gzip/Brotli on your host.
	- Optimizing and serving images with responsive `srcset` and WebP variants.

## Next suggested tasks (optional)
- Run Lighthouse and axe accessibility scans to quantify improvements and discover remaining issues.
- Replace the remaining Font Awesome icons and remove the CDN link to eliminate the external request.
- Add a small build step (npm scripts) to minify assets and produce a `dist/` folder for deployment.

## Contact
If you'd like help implementing any of the next steps (automating builds, CI, accessibility audits, or converting icons), tell me which one and I can implement it.
