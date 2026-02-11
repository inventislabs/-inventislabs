
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  name, 
  type, 
  keywords,
  canonical, 
  children 
}) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      {keywords && <meta name='keywords' content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Schema.org for Google */}
      {children}
    </Helmet>
  );
};

SEO.defaultProps = {
  title: 'Inventis Labs | No 1 Earthquake System & Structural Monitoring',
  description: 'Inventis Labs is the leading provider of earthquake alert systems and structural health monitoring solutions. Protect your assets with our advanced seismic technology.',
  name: 'Inventis Labs',
  type: 'website',
  keywords: 'earthquake system, seismic monitoring, structural health monitoring, earthquake alert, earthquake resistant'
};

export default SEO;
