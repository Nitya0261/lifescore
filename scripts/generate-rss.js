import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

const domain = 'https://lifesscore.live';

const sanityClient = createClient({
  projectId: 'o8lo52g5',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-06',
});

async function generateRss() {
  console.log('🚀 Initiating dynamic RSS feed compilation...');
  let posts = [];
  try {
    posts = await sanityClient.fetch(
      `*[_type == "blogPost"] | order(publishedAt desc) {
        title,
        "slug": slug.current,
        publishedAt,
        excerpt
      }`
    );
    console.log(`✅ Fetched ${posts.length} blog posts from Sanity for RSS feed.`);
  } catch (err) {
    console.error('⚠️ Could not fetch dynamic blog posts from Sanity for RSS:', err.message);
  }

  // Generate RSS XML content
  const lastBuildDate = new Date().toUTCString();
  const rssItemsXml = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${domain}/blog/${post.slug}</link>
      <guid isPermaLink="true">${domain}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt || '')}</description>
    </item>`
    )
    .join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LifeScore Blog</title>
    <link>${domain}/blog</link>
    <description>Latest insights on personal finance, saving, investing, and life intelligence from LifeScore.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml" />
${rssItemsXml}
  </channel>
</rss>`;

  // Write to public/ directory first (source files)
  const publicPath = path.join(publicDir, 'feed.xml');
  fs.writeFileSync(publicPath, rssXml, 'utf-8');
  console.log(`📜 RSS feed generated -> ${path.relative(rootDir, publicPath)}`);

  // Write to dist/ directory if it exists (production build artifact)
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'feed.xml');
    fs.writeFileSync(distPath, rssXml, 'utf-8');
    console.log(`📜 RSS feed copied to production folder -> ${path.relative(rootDir, distPath)}`);
  }
}

// Utility to escape XML special characters
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

generateRss().catch((err) => {
  console.error('💥 RSS generation aborted due to error:', err);
  process.exit(1);
});
