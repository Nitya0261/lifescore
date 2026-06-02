import { createClient } from '@sanity/client';
import fs from 'fs';

// Configuration - Ensure VITE_SANITY_WRITE_TOKEN is set in your .env or environment
const client = createClient({
  projectId: 'o8lo52g5',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // CRITICAL: Need a write token from Sanity Manage
  apiVersion: '2024-05-06',
});

const articles = JSON.parse(fs.readFileSync('./ai-articles.json', 'utf8'));

async function importArticles() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ Error: SANITY_WRITE_TOKEN environment variable is not set.');
    console.log('Please get a token from https://www.sanity.io/manage and run:');
    console.log('SANITY_WRITE_TOKEN=your_token_here node import-articles.js');
    return;
  }

  console.log(`🚀 Starting import of ${articles.length} articles to Sanity...`);

  for (const article of articles) {
    try {
      const doc = {
        _type: 'blogPost',
        title: article.title,
        slug: {
          _type: 'slug',
          current: article.slug
        },
        category: article.category,
        publishedAt: article.publishedAt,
        excerpt: article.excerpt,
        body: article.body,
        // Default SEO if missing
        seo: {
          _type: 'object',
          metaTitle: article.title,
          metaDescription: article.excerpt
        }
      };

      const result = await client.createOrReplace(doc);
      console.log(`✅ Imported: ${result.title}`);
    } catch (err) {
      console.error(`❌ Failed to import "${article.title}":`, err.message);
    }
  }

  console.log('🎉 Import complete!');
}

importArticles();
