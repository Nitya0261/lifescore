const fs = require('fs');
const path = require('path');

const domain = 'https://lifescore.app';

// Static routes in your React app
const staticRoutes = [
  '/',
  '/markets',
  '/economy',
  '/crypto',
  '/real-estate',
  '/saving-money',
  '/investing',
  '/debt',
  '/retirement',
  '/side-income',
  '/tools',
  '/login',
  '/register',
];

// In a real production setup, you would fetch blog post slugs from Sanity here
// using @sanity/client and add them to the dynamicRoutes array.
const dynamicRoutes = [
  '/blog/how-to-save-money',
  '/blog/crypto-market-update'
];

const allRoutes = [...staticRoutes, ...dynamicRoutes];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes.map(route => `
  <url>
    <loc>${domain}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapContent);
console.log('✅ sitemap.xml generated successfully in /public directory!');
