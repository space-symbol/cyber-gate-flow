import React from 'react';
import { Helmet } from 'react-helmet-async';

interface AccessibilityProps {
  pageTitle: string;
  mainContent?: string;
  skipToContent?: boolean;
}

const Accessibility: React.FC<AccessibilityProps> = ({ 
  pageTitle, 
  mainContent = "Основное содержимое",
  skipToContent = true 
}) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`${pageTitle} - CyberGate Flow`} />
      </Helmet>
      
      {skipToContent && (
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        >
          Перейти к основному содержимому
        </a>
      )}
      
      <main id="main-content" role="main" aria-label={mainContent}>
        {/* Content will be rendered here */}
      </main>
    </>
  );
};

export default Accessibility;
