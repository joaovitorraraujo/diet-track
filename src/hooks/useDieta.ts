import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import type { MealItem } from '@/types/diet';

export function useDieta() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'carb' | 'protein'>('carb');
  const [selectedMeal, setSelectedMeal] = useState<{ id: string; title: string } | null>(null);
  const [mealItems, setMealItems] = useState<Record<string, MealItem[]>>({});
  const [mealPhotos, setMealPhotos] = useState<Record<string, string>>({});

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

  function handlePickPhoto(mealId: string) {
    Alert.alert('Foto da refeição', 'Escolha uma opção', [
      {
        text: 'Câmera',
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') return;
          const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
          if (!result.canceled) {
            setMealPhotos((prev) => ({ ...prev, [mealId]: result.assets[0].uri }));
          }
        },
      },
      {
        text: 'Galeria',
        onPress: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') return;
          const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
          if (!result.canceled) {
            setMealPhotos((prev) => ({ ...prev, [mealId]: result.assets[0].uri }));
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  }

  return {
    modalVisible,
    modalType,
    selectedMeal,
    mealItems,
    mealPhotos,
    totalKcal,
    totalProteina,
    handleOpenModal,
    handleCloseModal,
    handleConfirm,
    handleDeleteItem,
    handlePickPhoto,
  };
}
