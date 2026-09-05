import React from 'react';
import ModernDeveloper from './ModernDeveloper';
import Professional from './Professional';
import Creative from './Creative';

const TemplateRenderer = ({ portfolio, isPreview = false }) => {
  const templateId = portfolio?.selectedTemplate || 'modern-dev';

  switch (templateId) {
    case 'professional':
      return <Professional portfolio={portfolio} isPreview={isPreview} />;
    case 'creative':
      return <Creative portfolio={portfolio} isPreview={isPreview} />;
    case 'modern-dev':
    default:
      return <ModernDeveloper portfolio={portfolio} isPreview={isPreview} />;
  }
};

export default TemplateRenderer;
