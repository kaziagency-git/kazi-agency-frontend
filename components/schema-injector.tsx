'use client';

import { useEffect } from 'react';
import { FAQItem } from './faq';
import { generateFAQSchema } from '@/lib/schema-markup';

interface SchemaInjectorProps {
  items: FAQItem[];
}

export function SchemaInjector({ items }: SchemaInjectorProps) {
  useEffect(() => {
    // Create and inject FAQ schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(generateFAQSchema(items));
    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, [items]);

  return null;
}
