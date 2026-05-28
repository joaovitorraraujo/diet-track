import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { MEALS } from '@/mocks/meals';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useHome() {
  const { user } = useAuth();
  const [completions, setCompletions] = useState<Record<string, string | null>>({});
  const [mealKcalTotals, setMealKcalTotals] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;

      async function loadHomeData() {
        setIsLoading(true);
        const today = new Date().toISOString().split('T')[0];

        const { data: completionsData } = await supabase
          .from('user_daily_completions')
          .select('*')
          .eq('user_id', user!.id)
          .eq('date', today);

        if (completionsData) {
          const compMap: Record<string, string> = {};
          completionsData.forEach(c => {
            compMap[c.meal_id] = c.completed_time;
          });
          setCompletions(compMap);
        }

        const { data: dietItems } = await supabase
          .from('user_diet_items')
          .select('meal_id, kcal')
          .eq('user_id', user!.id);

        if (dietItems) {
          const kcalMap: Record<string, number> = {};
          dietItems.forEach(item => {
            kcalMap[item.meal_id] = (kcalMap[item.meal_id] || 0) + item.kcal;
          });
          setMealKcalTotals(kcalMap);
        }

        setIsLoading(false);
      }

      loadHomeData();
    }, [user])
  );

  async function handleToggle(id: string) {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const isCompleted = !!completions[id];

    setCompletions(prev => {
      if (prev[id]) return { ...prev, [id]: null };
      return { ...prev, [id]: time };
    });

    if (isCompleted) {
      await supabase
        .from('user_daily_completions')
        .delete()
        .match({ user_id: user.id, date: today, meal_id: id });
    } else {
      await supabase
        .from('user_daily_completions')
        .upsert({
          user_id: user.id,
          date: today,
          meal_id: id,
          completed_time: time,
        });
    }
  }

  const meals = MEALS.map((m) => {
    const totalKcal = mealKcalTotals[m.id] || 0;
    const kcalText = `${totalKcal} kcal`;
    return {
      ...m,
      completed: !!completions[m.id],
      subtitle: completions[m.id] ? `${kcalText} • ${completions[m.id]}` : kcalText,
    };
  });

  return { meals, isLoading, handleToggle };
}
