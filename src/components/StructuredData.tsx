import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'WebApplication' | 'Organization' | 'WebPage' | 'BreadcrumbList';
  data: Record<string, unknown>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type,
      ...data
    };

    switch (type) {
      case 'WebApplication':
        return {
          ...baseData,
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "RUB"
          }
        };
      
      case 'Organization':
        return {
          ...baseData,
          "url": "https://cybergateflow.com/",
          "logo": "https://cybergateflow.com/logo.png"
        };
      
      case 'WebPage':
        return {
          ...baseData,
          "isPartOf": {
            "@type": "WebSite",
            "name": "CyberGate Flow",
            "url": "https://cybergateflow.com/"
          }
        };
      
      case 'BreadcrumbList':
        return {
          ...baseData,
          "itemListElement": data.itemListElement || []
        };
      
      default:
        return baseData;
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};

export default StructuredData;
