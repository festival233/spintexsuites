SPINTEX SITE V7 FOLDER

A clean luxury static website folder for Spintex Suites with:
- original quote style from the first homepage
- separate rooms, services, reviews, deals, and contact pages
- SEO meta tags
- WhatsApp button
- Instagram link
- corner popup for 10% special deal
- dynamic booking demand bar and activity text
- simple static setup for easy GitHub + Cloudflare upload

UPLOAD
1. Delete old site files from the repo.
2. Upload everything inside this folder to the repo root.
3. Do not upload the zip itself.
4. Cloudflare Pages framework preset should be NONE.
5. Build command blank.
6. Output directory blank or root.


CONTACT FORM EMAIL SETUP (CLOUDFLARE + RESEND)
1. In Cloudflare Pages project settings, create environment variables:
   - RESEND_API_KEY = your Resend API key
   - CONTACT_TO_EMAIL = spintexsuites@gmail.com
   - CONTACT_FROM_EMAIL = verified sender (example: Spintex Suites <booking@yourdomain.com>)
2. Ensure CONTACT_FROM_EMAIL uses a verified domain in Resend.
3. The website contact form posts to /api/contact (Cloudflare Pages Function).
4. Redeploy after adding variables.
