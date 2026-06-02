import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const STATIC_ROUTES = [
  '/',
  '/blog',
  '/saving-money',
  '/investing',
  '/debt',
  '/real-estate',
  '/retirement',
  '/side-income',
  '/glossary',
  '/tools',
  '/tools/sip-calculator',
  '/tools/compound-interest',
  '/tools/retirement-number',
  '/tools/net-worth',
  '/tools/tax-estimator',
  '/tools/emergency-fund',
  '/tools/debt-payoff',
  '/markets',
  '/recommendations/cards',
  '/recommendations/savings',
  '/compare',
  '/compare/roth-ira-vs-401k',
  '/compare/etf-vs-mutual-fund',
  '/advisor',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/article/50-30-20-rule-explained',
  '/article/index-vs-active-funds',
  '/article/avalanche-vs-snowball-debt',
  '/article/renting-vs-buying-2026',
  '/article/7-ways-boost-credit-score',
  '/article/emergency-fund-mistakes',
  '/article/15-legit-side-hustles',
  '/article/how-much-need-retire',
  '/article/2026-personal-finance-checklist',
  '/article/hysa-beating-market',
  '/article/stop-subscription-creep',
  '/article/tax-loss-harvesting-guide',
  '/article/salary-negotiation-script',
  '/article/what-is-barista-fire',
  '/article/hysa-vs-market-inflation-2026',
  '/article/how-to-track-net-worth-2026',
  '/article/emergency-fund-calculator-2026',
  '/article/best-financial-goals-2026'
];

const sanityClient = createClient({
  projectId: 'o8lo52g5',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-06',
});

async function getDynamicRoutes() {
  try {
    const posts = await sanityClient.fetch('*[_type == "blogPost"]{ "slug": slug.current }');
    return posts.map(p => `/blog/${p.slug}`);
  } catch (err) {
    console.error('⚠️ Could not fetch dynamic blog routes from Sanity:', err.message);
    return [];
  }
}

async function generateIndexedPages() {
  console.log('🚀 Initiating automated production indexed pages build & pre-rendering crawler...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');
  if (!fs.existsSync(serverEntryPath)) {
    console.error('❌ Server entry point not found. Make sure "vite build --ssr" succeeded.');
    process.exit(1);
  }

  // Import the render function from the compiled server entry.
  // We use file:// to avoid path parsing issues on Windows/Mac in Node dynamic ESM imports.
  const serverEntryUrl = `file://${serverEntryPath}`;
  const { render } = await import(serverEntryUrl);

  const baseUrl = 'https://lifesscore.live';
  const templatePath = path.join(distDir, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Track canonical entries for sitemap generation
  const sitemapUrls = [];

  // Fetch all routes to pre-render
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

  console.log(`🌐 Found ${allRoutes.length} total routes to pre-render. Starting SSR compilation...`);

  for (const route of allRoutes) {
    console.log(`⚙️ Pre-rendering route: ${route}`);

    try {
      let { html: appHtml } = render(route, {});

      let headTagsList = [];

      // Extract and remove <title> tags
      appHtml = appHtml.replace(/<title[^>]*>([\s\S]*?)<\/title>/gi, (match) => {
        headTagsList.push(match);
        return '';
      });

      // Extract and remove <meta> tags
      appHtml = appHtml.replace(/<meta[^>]*\/?>/gi, (match) => {
        headTagsList.push(match);
        return '';
      });

      // Extract and remove <link> tags
      appHtml = appHtml.replace(/<link[^>]*\/?>/gi, (match) => {
        headTagsList.push(match);
        return '';
      });

      // Extract and remove JSON-LD scripts
      appHtml = appHtml.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, (match) => {
        headTagsList.push(match);
        return '';
      });

      const headTags = headTagsList.join('\n');

      // Remove default React Helmet placeholder tags from template
      let html = template
        .replace(/<title[^>]*data-rh="true"[^>]*>.*?<\/title>/gi, '')
        .replace(/<meta[^>]*data-rh="true"[^>]*\/?>/gi, '');

      // Inject the route-specific head tags
      html = html.replace('</head>', `${headTags}\n</head>`);

      // Inject the rendered application HTML markup
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // Determine output filesystem destination
      let targetFilePath;
      if (route === '/') {
        // We write to index.html directly
        targetFilePath = path.join(distDir, 'index.html');
      } else {
        const routeDir = path.join(distDir, route.replace(/^\//, ''));
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        targetFilePath = path.join(routeDir, 'index.html');
      }

      // Write fully hydrated DOM string to production artifact
      fs.writeFileSync(targetFilePath, html, 'utf-8');
      console.log(`✅ Fully-hydrated HTML generated -> ${path.relative(rootDir, targetFilePath)}`);

      // Push to canonical absolute mapping list
      sitemapUrls.push(`${baseUrl}${route}`);
    } catch (err) {
      console.error(`⚠️ Failed to generate indexing wrapper for route ${route}:`, err);
    }
  }

  // Construct canonical automated XML sitemap file
  console.log('🗺️ Assembling complete production sitemap.xml structure...');
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url === baseUrl + '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const sitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`📜 Validated sitemap output successfully to -> ${path.relative(rootDir, sitemapPath)}`);

  const publicSitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');
  console.log(`📜 Saved sitemap to public folder -> ${path.relative(rootDir, publicSitemapPath)}`);

  // Clean up server build folder from dist so Vercel doesn't deploy it
  const serverBuildDir = path.join(distDir, 'server');
  if (fs.existsSync(serverBuildDir)) {
    fs.rmSync(serverBuildDir, { recursive: true, force: true });
    console.log('🧹 Cleaned up temporary server bundle successfully.');
  }

  console.log('🎉 Production prerendering complete! Ecosystem static distribution is ready for search engine crawling.');
}

generateIndexedPages().catch((err) => {
  console.error('💥 Prerendering engine critical abort:', err);
  process.exit(1);
});
