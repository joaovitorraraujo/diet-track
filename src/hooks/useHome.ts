import { useState } from 'react';
import { MEALS } from '@/mocks/meals';

export function useHome() {
  const [completions, setCompletions] = useState<Record<string, string | null>>({});

  function handleToggle(id: string) {
    setCompletions((prev) => {
      if (prev[id]) return { ...prev, [id]: null };
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      return { ...prev, [id]: time };
    });
  }

  const meals = MEALS.map((m) => ({
    ...m,
    completed: !!completions[m.id],
    subtitle: completions[m.id] ? `${m.kcal} • ${completions[m.id]}` : m.kcal,
  }));

  return { meals, handleToggle };
}
