import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';
import type { MealItem } from '@/types/diet';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useDieta() {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'carb' | 'protein'>('carb');
  const [selectedMeal, setSelectedMeal] = useState<{ id: string; title: string } | null>(null);
  const [mealItems, setMealItems] = useState<Record<string, MealItem[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;

      async function loadItems() {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('user_diet_items')
          .select('*')
          .eq('user_id', user!.id);

        if (error) {
          Alert.alert('Erro', 'Não foi possível carregar o plano alimentar.');
        } else if (data) {
          const grouped: Record<string, MealItem[]> = {};
          data.forEach((item) => {
            if (!grouped[item.meal_id]) grouped[item.meal_id] = [];
            grouped[item.meal_id].push({
              id: item.id,
              alimento: item.alimento,
              gramas: item.gramas,
              kcal: item.kcal,
              proteina: item.proteina ?? undefined,
            });
          });
          setMealItems(grouped);
        }
        setIsLoading(false);
      }

      loadItems();
    }, [user])
  );

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

  async function handleConfirm(item: Omit<MealItem, 'id'>) {
    if (!selectedMeal || !user) return;
    
    const newItemId = Date.now().toString();
    const newItem: MealItem = { ...item, id: newItemId };
    
    setMealItems((prev) => ({
      ...prev,
      [selectedMeal.id]: [...(prev[selectedMeal.id] ?? []), newItem],
    }));
    setModalVisible(false);
    
    const mealId = selectedMeal.id; 
    setSelectedMeal(null);

    const { error } = await supabase.from('user_diet_items').insert({
      user_id: user.id,
      meal_id: mealId,
      alimento: item.alimento,
      gramas: item.gramas,
      kcal: item.kcal,
      proteina: item.proteina ?? null,
    });

    if (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o alimento.');
      
      setMealItems((prev) => ({
        ...prev,
        [mealId]: (prev[mealId] ?? []).filter((i) => i.id !== newItemId),
      }));
    }
  }

  async function handleDeleteItem(mealId: string, itemId: string) {
    if (!user) return;
    
    const itemToDelete = mealItems[mealId]?.find((i) => i.id === itemId);
    if (!itemToDelete) return;

    setMealItems((prev) => ({
      ...prev,
      [mealId]: (prev[mealId] ?? []).filter((i) => i.id !== itemId),
    }));

    const { error } = await supabase
      .from('user_diet_items')
      .delete()
      .eq('id', itemId) 
      .eq('user_id', user.id);

    if (error) {
      Alert.alert('Erro', 'Não foi possível remover o alimento.');
      
      setMealItems((prev) => ({
        ...prev,
        [mealId]: [...(prev[mealId] ?? []), itemToDelete],
      }));
    }
  }

  return {
    modalVisible,
    modalType,
    selectedMeal,
    mealItems,
    isLoading,
    totalKcal,
    totalProteina,
    handleOpenModal,
    handleCloseModal,
    handleConfirm,
    handleDeleteItem,
  };
}
