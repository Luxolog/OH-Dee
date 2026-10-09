# OH-Dee Online Store Preview

A mobile-friendly static store prototype based on the product categories and prices in the customer-supplied OH-Dee combo list.

## Included
- Responsive storefront layout
- Product category filters
- Individual product cards and prices
- Combo deals
- Working in-browser shopping bag with quantity controls and subtotal
- Checkout enquiry preview
- Newsletter form placeholder

## Preview locally
Open `index.html` in a modern browser.

## Publish to GitHub Pages
1. Upload `index.html`, `style.css`, `app.js`, and the `assets` folder to the root of the `Luxolog/OH-Dee` repository.
2. Commit the files to `main`.
3. Open Settings → Pages.
4. Set Source to `Deploy from a branch`, branch `main`, folder `/(root)`, then Save.
5. After deployment, test the published URL and all mobile layouts.

## Before production launch
This is a front-end prototype, not a complete production commerce system. Do not take real payments or collect customer details through this demo. Confirm with the owner:
- Current product images, logo files and final product descriptions
- Contact number / WhatsApp number
- Stock and variants
- Delivery regions, fees, timelines and returns policy
- Payment provider and secure server-side checkout
- Privacy policy, terms and POPIA-compliant customer consent
- Email/newsletter provider
- Order management, stock tracking, analytics and backup plan

`WHATSAPP_NUMBER` in `app.js` is intentionally blank until the owner confirms the correct number. Product images in this prototype are CSS-generated placeholders; replace them with approved original product photographs before production.
