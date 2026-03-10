SPINTEX SUITES PREMIUM SITE — VERSION 5 + VERSION 6 EXTRAS

WHAT'S INCLUDED
- Luxury homepage with Ghana-meets-Four-Seasons look
- View Rooms page with 8 room cards and filters
- 4 dedicated suite detail pages
- Concierge page
- Reviews page
- Offers page
- Contact / booking page
- WhatsApp floating button
- Instagram link
- Elegant VIP popup for 10% offer
- Dynamic booking meter + activity ticker
- Special request forms
- Bed preference options: soft / medium / firm
- Cloudflare Pages Functions for:
  - /api/subscribe
  - /api/inquiry

HOW TO DEPLOY
1) Unzip this folder.
2) Replace your old site files completely with these files.
3) Push everything to your GitHub repo.
4) Cloudflare Pages should deploy automatically.

EMAIL SETUP
To make forms send to spintexsuites@gmail.com:
1) In Cloudflare Pages, open your project.
2) Go to Settings > Environment variables.
3) Add:
   Name: RESEND_API_KEY
   Value: your Resend API key
4) Save and redeploy.

IMPORTANT
- Do NOT paste the API key into HTML or JavaScript files.
- Only place it in Cloudflare environment variables.
- The forms are already coded to route to spintexsuites@gmail.com.

BOOKING LINKS
Search these files for the phrase:
"placeholder"
Then replace placeholder links with your real Airbnb, Booking.com, and Agoda URLs.

CUSTOMIZE QUICKLY
- Main styling: css/styles.css
- Main behavior: js/app.js
- Homepage: index.html
- All extra pages: pages/

NOTES
- The reviews section is demo-ready and visually styled for real widgets later.
- The booking activity and demand pulse are tasteful dynamic UX elements to create energy on the site.
- Instagram is linked to @spintexsuites.
- WhatsApp is linked to +1 347 391 4312.
