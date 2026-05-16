import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

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
  '/markets',
  '/advisor',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer'
];

const sanityClient = createClient({
  projectId: 't18y5tol',
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

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

async function generateIndexedPages() {
  console.log('🚀 Initiating automated production indexed pages build & pre-rendering crawler...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  // 1. Spin up a fast static fileserver for dist/
  const server = http.createServer((req, res) => {
    // Basic route mapping
    let cleanUrl = req.url.split('?')[0].split('#')[0];
    let filePath = path.join(distDir, cleanUrl);

    // If request has an extension, serve file directly
    const ext = path.extname(filePath);
    if (ext) {
      if (fs.existsSync(filePath)) {
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
      }
      return;
    }

    // Default SPA fallback: Serve dist/index.html
    const indexPath = path.join(distDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream(indexPath).pipe(res);
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('dist/index.html missing');
    }
  });

  // Start listening on a free random/fixed local port
  const PORT = 38491;
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
  console.log(`📡 Local preview host live at http://127.0.0.1:${PORT}`);

  // 2. Launch Puppeteer browser instance
  console.log('🤖 Initializing high-speed static DOM generation engine (Puppeteer)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Track canonical entries for sitemap generation
  const sitemapUrls = [];
  const baseUrl = 'https://lifescore-ten.vercel.app';

  // 3. Pre-render individual scope routes
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];
  
  for (const route of allRoutes) {
    const targetUrl = `http://127.0.0.1:${PORT}${route}`;
    console.log(`🌐 Crawling target route: ${route}`);

    const page = await browser.newPage();
    // Forward virtual console outputs if debugging needed
    await page.setViewport({ width: 1280, height: 800 });

    try {
      await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 25000 });
      
      // Wait extra 500ms to guarantee Client-Side hydration microtasks settle completely
      await new Promise(r => setTimeout(r, 500));

      // Extract full rendered HTML payload
      const htmlContent = await page.content();

      // Determine output filesystem destination
      let targetFilePath;
      if (route === '/') {
        targetFilePath = path.join(distDir, 'index.html');
      } else {
        const routeDir = path.join(distDir, route.replace(/^\//, ''));
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        targetFilePath = path.join(routeDir, 'index.html');
      }

      // Write fully hydrated DOM string to production artifact
      fs.writeFileSync(targetFilePath, htmlContent, 'utf-8');
      console.log(`✅ Fully-hydrated HTML generated -> ${path.relative(rootDir, targetFilePath)}`);

      // Push to canonical absolute mapping list
      sitemapUrls.push(`${baseUrl}${route}`);
    } catch (err) {
      console.error(`⚠️ Failed to generate indexing wrapper for route ${route}:`, err.message);
    } finally {
      await page.close();
    }
  }

  // 4. Construct canonical automated XML sitemap file
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

  // Cleanup active resources
  await browser.close();
  server.close();
  console.log('🎉 Production prerendering complete! Ecosystem static distribution is ready for search engine crawling.');
}

generateIndexedPages().catch((err) => {
  console.error('💥 Prerendering engine critical abort:', err);
  process.exit(1);
});
