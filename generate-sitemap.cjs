const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const domain = 'https://lifesscore.live';

const sanityClient = createClient({
  projectId: 'o8lo52g5',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-06',
});

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

async function generateSitemap() {
  console.log('🚀 Generating sitemap dynamically from Sanity...');
  let dynamicRoutes = [];
  try {
    const posts = await sanityClient.fetch('*[_type == "blogPost"]{ "slug": slug.current }');
    dynamicRoutes = posts.map(p => `/blog/${p.slug}`);
    console.log(`✅ Loaded ${dynamicRoutes.length} dynamic routes from Sanity.`);
  } catch (err) {
    console.error('⚠️ Could not fetch dynamic blog routes from Sanity for sitemap, using fallbacks:', err.message);
    dynamicRoutes = [
      '/blog/how-to-save-money',
      '/blog/crypto-market-update'
    ];
  }

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
}

generateSitemap().catch(err => {
  console.error('❌ Sitemap generation failed:', err);
});
