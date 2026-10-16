# Krunal Mahajan: Cybersecurity Portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies, no secrets.

```
index.html   page content
styles.css   Minimal Red theme (colors are variables at the top)
script.js    resume check, placeholder links, form validation
assets/      put resume.pdf here
```

## Run locally
Open `index.html` in a browser, or for accurate resume checking run a server:
```
python -m http.server 8000
```
then visit http://localhost:8000.

## Publish on GitHub Pages
1. Create a new public repository on github.com (e.g. `portfolio`).
2. In this folder run:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. On GitHub: Settings > Pages > Source: "Deploy from a branch" > Branch `main`, folder `/ (root)` > Save.
4. After a minute the site is live at `https://<your-username>.github.io/portfolio/`.

## Update content
- **Resume:** replace `assets/resume.pdf` with your latest PDF (keep the file name). Until the file exists, the page shows a "not found" message instead of a broken download.
- **Projects:** edit the `<article class="card project">` blocks in `index.html`. Change status (Planned, In Progress, Completed), technologies, and replace `href="#"` and `[ADD REPOSITORY URL]` with real links. Add screenshots as `<img src="assets/name.png" alt="...">` inside the card.
- **Certificates:** in `index.html`, copy the commented TEMPLATE line inside `#earned`, fill it in, and delete the "No certificates" line. List only certificates you have earned, with a verification URL.

## Contact form
The form validates in the browser but needs a service to deliver messages.
1. Create a free form at https://formspree.io and copy your form ID.
2. In `index.html` replace `YOUR_FORM_ID` in the form `action` with it.

Until then, the form shows "not connected" and sends nothing.

## Placeholders to replace (search `[ADD` in index.html)
- `[ADD REPOSITORY URL]` and `href="#"` (View Project / GitHub on the project)
- `[ADD STATUS]` and `[ADD TECHNOLOGIES]` (Cybersecurity Lab project)
- `YOUR_FORM_ID` (form action)
- Only remaining content to add: more certificates and project details. Phone, email, GitHub, LinkedIn, resume and the Redynox certificate are already filled in.

Placeholder links are greyed out and do nothing until replaced.
