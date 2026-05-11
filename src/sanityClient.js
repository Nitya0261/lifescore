import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // Loaded from .env
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-05-06', // use current date (YYYY-MM-DD) to target the latest API version
});
