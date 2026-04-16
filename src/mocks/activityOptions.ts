export type ActivityLevel = 'sedentario' | 'moderado' | 'intenso';

export const ACTIVITY_OPTIONS: { id: ActivityLevel; label: string; description: string; multiplier: number }[] = [
  { id: 'sedentario', label: 'Sedentário', description: 'Pouca ou nenhuma atividade • 1.6g/kg', multiplier: 1.6 },
  { id: 'moderado', label: 'Moderado', description: 'Treina 3-4x por semana • 1.8g/kg', multiplier: 1.8 },
  { id: 'intenso', label: 'Intenso', description: 'Treina 5-7x por semana • 2g/kg', multiplier: 2.0 },
];
