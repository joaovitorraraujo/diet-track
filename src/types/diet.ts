export type MealItem = {
  id: string;
  alimento: string;
  gramas: string;
  kcal: number;
  proteina?: number;
};

export type DietItemRow = {
  id: string;
  user_id: string;
  meal_id: string;
  alimento: string;
  gramas: string;
  kcal: number;
  proteina: number | null;
};

export type DailyCompletionRow = {
  user_id: string;
  date: string;
  meal_id: string;
  completed_time: string;
};
