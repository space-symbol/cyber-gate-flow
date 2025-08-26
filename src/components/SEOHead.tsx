import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

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
  title = 'CyberGate Flow - Управление VPN устройствами и подписками',
  description = 'Современное приложение для управления VPN устройствами, подписками и безопасными подключений. Контролируйте статус подключений, добавляйте новые устройства.',
  keywords = 'VPN, безопасность, устройства, подписки, управление, кибербезопасность, сеть',
  image = '/og-image.jpg',
  url = 'https://cybergateflow.com/',
  type = 'website',
  canonical
}) => {
  const fullTitle = title.includes('CyberGate Flow') ? title : `${title} | CyberGate Flow`;
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
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="CyberGate Flow" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Russian" />
    </Helmet>
  );
};

export default SEOHead;
