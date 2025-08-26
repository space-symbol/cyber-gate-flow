import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONSTANTS } from '@/lib/seo-constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = SEO_CONSTANTS.PAGES.HOME.title,
  description = SEO_CONSTANTS.PAGES.HOME.description,
  keywords = SEO_CONSTANTS.PAGES.HOME.keywords,
  image = SEO_CONSTANTS.OPEN_GRAPH.image,
  url = SEO_CONSTANTS.PAGES.HOME.url,
  type = SEO_CONSTANTS.OPEN_GRAPH.type,
  canonical
}) => {
  const fullTitle = title.includes(SEO_CONSTANTS.SITE_NAME) ? title : `${title} | ${SEO_CONSTANTS.SITE_NAME}`;
  const canonicalUrl = canonical || url;

  useEffect(() => {
    // Update document title for better accessibility
    document.title = fullTitle;
  }, [fullTitle]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SEO_CONSTANTS.OPEN_GRAPH.siteName} />
      <meta property="og:locale" content={SEO_CONSTANTS.OPEN_GRAPH.locale} />
      
      {/* Twitter */}
      <meta property="twitter:card" content={SEO_CONSTANTS.TWITTER.card} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;
