import { useState, useEffect } from 'react';
import { LayoutAnimation } from 'react-native';
import { searchFoodsAPI } from '@/services/foodApi';
import { useDebounce } from './useDebounce';
import type { Alimento } from '@/types/alimento';

export function useAlimentos() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 800); 
  
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFoods() {
      if (!debouncedSearch.trim()) {
        setAlimentos([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchFoodsAPI(debouncedSearch);
        setAlimentos(results);
      } catch (err) {
        setError('Não foi possível carregar os alimentos. Tente novamente mais tarde.');
        setAlimentos([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFoods();
  }, [debouncedSearch]);

  function handleToggle(id: string) {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.spring, springDamping: 0.7 },
      delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
    });
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return { search, setSearch, expandedId, alimentos, isLoading, error, handleToggle };
}
