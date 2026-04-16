import { useState } from 'react';
import type { MealItem } from '@/types/diet';

export function useDieta() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'carb' | 'protein'>('carb');
  const [selectedMeal, setSelectedMeal] = useState<{ id: string; title: string } | null>(null);
  const [mealItems, setMealItems] = useState<Record<string, MealItem[]>>({});

  const allItems = Object.values(mealItems).flat();
  const totalKcal = allItems.reduce((s, i) => s + i.kcal, 0);
  const totalProteina = allItems.reduce((s, i) => s + (i.proteina ?? 0), 0);

  function handleOpenModal(meal: { id: string; title: string }, type: 'carb' | 'protein') {
    setSelectedMeal(meal);
    setModalType(type);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedMeal(null);
  }

  function handleConfirm(item: MealItem) {
    if (!selectedMeal) return;
    const newItem: MealItem = { ...item, id: Date.now().toString() };
    setMealItems((prev) => ({
      ...prev,
      [selectedMeal.id]: [...(prev[selectedMeal.id] ?? []), newItem],
    }));
    setModalVisible(false);
    setSelectedMeal(null);
  }

  function handleDeleteItem(mealId: string, itemId: string) {
    setMealItems((prev) => ({
      ...prev,
      [mealId]: (prev[mealId] ?? []).filter((i) => i.id !== itemId),
    }));
  }

  return {
    modalVisible,
    modalType,
    selectedMeal,
    mealItems,
    totalKcal,
    totalProteina,
    handleOpenModal,
    handleCloseModal,
    handleConfirm,
    handleDeleteItem,
  };
}
