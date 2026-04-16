import { useState } from 'react';
import { ACTIVITY_OPTIONS, type ActivityLevel } from '@/mocks/activityOptions';

function computeProtein(weight: string, activity: ActivityLevel): string | null {
  const kg = parseFloat(weight);
  if (!kg || kg <= 0) return null;
  const multiplier = ACTIVITY_OPTIONS.find((o) => o.id === activity)?.multiplier ?? 1.8;
  return `${Math.round(kg * multiplier)}g`;
}

export function useMeta() {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderado');

  const selectedActivity = ACTIVITY_OPTIONS.find((o) => o.id === activityLevel)!;
  const proteinGoal = computeProtein(weight, activityLevel);
  const formulaLabel = weight
    ? `${weight}kg x ${selectedActivity.multiplier}g/kg`
    : '—';

  return { weight, setWeight, activityLevel, setActivityLevel, selectedActivity, proteinGoal, formulaLabel };
}
