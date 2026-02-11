# SEO Improvements & "No 1 Earthquake System" Branding

We have implemented a comprehensive SEO strategy for Inventis Labs, focusing on ranking as the "#1 Earthquake System".

## Changes Made

1.  **SEO Component**: Created `src/components/SEO.jsx` to manage meta tags (Title, Description, Keywords, OG Tags, Twitter Cards) and Structured Data (JSON-LD) dynamically.
2.  **Page Integration**:
    *   **Landing Page**: Added "No 1 Earthquake System" to title and "Organization" schema.
    *   **EQ-Alert Page**: Added "No 1 Earthquake Warning System" to title and "Product" schema.
    *   **Structural Monitoring Page**: Added "Structural Health Monitoring" keywords and "Service" schema.
    *   **Solutions Page**: Added general solution keywords.
3.  **Sitemap**: Created `public/sitemap.xml` listing all key pages.
4.  **Robots.txt**: Created `public/robots.txt` pointing to the sitemap.
5.  **App Wrapper**: Updated `src/main.jsx` to provide SEO context via `HelmetProvider`.

## 🚨 IMPORTANT: Action Required

The changes require the `react-helmet-async` package. You **MUST** run the following command to install it, otherwise the app will fail to start:

```bash
npm install react-helmet-async
```

After installation, your app will be fully optimized for:
-   **Google Search Console**: Through sitemap and semantic HTML.
-   **Rich Snippets**: Through Schema.org structured data (Organization, Product, Service).
-   **Social Sharing**: Through Open Graph and Twitter metadata.
