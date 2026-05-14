import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, url, type = 'website', children }) {
  const siteName = 'LifeScore';
  const defaultDesc = 'Improve productivity, mindset and mental wellness with LifeScore platform telemetry.';
  const defaultUrl = 'https://lifescore-ten.vercel.app';
  const defaultImage = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80';

  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Mental Health & Productivity`;
  const canonicalUrl = url || defaultUrl;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph Metadata (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Additional children (like JSON-LD schema) */}
      {children}
    </Helmet>
  );
}
