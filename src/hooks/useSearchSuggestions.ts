import { useState, useEffect } from 'react';
import { useProperties } from './useProperties';

export const useSearchSuggestions = (query: string) => {
  const { properties } = useProperties();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const locationSet = new Set<string>();

    properties.forEach((property) => {
      // Add city suggestions
      if (property.city.toLowerCase().includes(searchQuery)) {
        locationSet.add(`${property.city}, ${property.state}`);
      }
      
      // Add state suggestions
      if (property.state.toLowerCase().includes(searchQuery)) {
        locationSet.add(property.state);
      }
      
      // Add zip code suggestions
      if (property.zip_code.includes(query.trim())) {
        locationSet.add(`${property.zip_code} - ${property.city}`);
      }
    });

    setSuggestions(Array.from(locationSet).slice(0, 5));
  }, [query, properties]);

  return suggestions;
};
