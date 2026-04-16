import { useMemo, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { ALIMENTOS } from '@/mocks/alimentos';

export function useAlimentos() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('1');

  const filteredAlimentos = useMemo(() => {
    if (!search.trim()) return ALIMENTOS;
    const lower = search.toLowerCase();
    return ALIMENTOS.filter((a) => a.nome.toLowerCase().includes(lower));
  }, [search]);

  function handleToggle(id: string) {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.spring, springDamping: 0.7 },
      delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
    });
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return { search, setSearch, expandedId, filteredAlimentos, handleToggle };
}
