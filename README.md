# TensorSlow Academy — teaching portfolio website

A responsive static website built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — page content and sections
- `style.css` — responsive layout, colours, typography and visual styling
- `script.js` — mobile navigation, subject filters, FAQ accordion, enquiry form and contact settings

## Personalise before publishing
Open `script.js` and update:

```js
const SITE_CONFIG = {
  email: "YOUR_EMAIL@example.com",
  whatsapp: "91XXXXXXXXXX"
};
```

Use the WhatsApp number with country code and digits only. Then open `index.html` and review the social/project links, qualifications, experience wording and course list. Add your profile photograph, demo-lecture link, exact fee structure and student testimonials only when you have them.

## Run locally
Double-click `index.html` or open it in a browser. No build tools, framework or installation is required.

## Publish free
You can host this static site with GitHub Pages or Netlify. The contact form currently opens the visitor's email application using `mailto:`; it does not store form submissions or send email from a server. To collect enquiries without depending on the visitor's mail app, connect a form service or add a backend later.
