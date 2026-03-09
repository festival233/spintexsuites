SPINTEX SUITES WEBSITE V3

This package includes:
- luxury homepage
- 8 clickable suite cards
- suite layout popups
- WhatsApp floating button
- Instagram link section
- booking placeholders for Airbnb, Booking.com, and Agoda
- rotating review demo area with room for real review widgets
- popup email signup form for offers and updates
- special request inquiry form
- Cloudflare Pages Function that emails submissions to spintexsuites@gmail.com

HOW TO ACTIVATE EMAIL DELIVERY
1. Deploy the folder to Cloudflare Pages.
2. In Cloudflare Pages > your project > Settings > Environment variables:
   Add RESEND_API_KEY = your Resend API key
3. Optional: add FROM_EMAIL if you want a branded sender email.
4. Redeploy.

WHAT HAPPENS AFTER SETUP
- the popup signup form sends email signups to spintexsuites@gmail.com
- the special request form sends inquiries to spintexsuites@gmail.com

IMPORTANT NOTE ABOUT THE DEMAND / REVIEW AREA
- the changing "availability pulse" and rotating review cards are demo presentation features
- they are not connected to a real booking engine yet
- replace them later with live data from Airbnb, Booking.com, Agoda, Hostaway, Guesty, or another PMS/channel manager for true live numbers and real reviews

MAIN FILES
- index.html
- styles.css
- script.js
- functions/api/inquiry.js
