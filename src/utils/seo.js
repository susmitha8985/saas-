// src/utils/seo.js - Dynamic Meta Title & Meta Description Per Page Hook

import { useEffect } from 'react';

export const useSEO = ({ title, description }) => {
  useEffect(() => {
    // 1. Update document title
    if (title) {
      document.title = `${title} | codeforeverybody`;
    } else {
      document.title = 'codeforeverybody — Build Skills. New Opportunities.';
    }

    // 2. Update meta description tag
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }
  }, [title, description]);
};
