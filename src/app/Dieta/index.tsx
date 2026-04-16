import { useState } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MealPlanCard } from '@/components/pages/Dieta/MealPlanCard';
import { AddMealModal } from '@/components/pages/Dieta/AddMealModal';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import type { MealItem } from '@/types/diet';
import { styles } from './styles';
import { backgroundImage } from '@/assets';

const MEALS = [
  { id: '1', title: 'Café da Manhã', icon: 'weather-sunny' as const },
  { id: '2', title: 'Almoço', icon: 'silverware-fork-knife' as const },
  { id: '3', title: 'Lanche da tarde', icon: 'cup-outline' as const },
  { id: '4', title: 'Janta', icon: 'weather-night' as const },
];

export function Dieta() {
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

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar style="light" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScreenHeader title="Plano Alimentar" subtitle="Crie seu plano alimentar do dia" />

        <View style={styles.statsCard}>
          <View style={styles.statsColumn}>
            <Text style={styles.statsLabel}>Proteínas</Text>
            <Text style={styles.statsValue}>{totalProteina}g</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsColumn}>
            <Text style={styles.statsLabel}>Total de Kcal</Text>
            <Text style={styles.statsValue}>{totalKcal}</Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {MEALS.map((meal) => {
              const items = mealItems[meal.id] ?? [];
              const mealKcal = items.reduce((s, i) => s + i.kcal, 0);
              const mealProteina = items.reduce((s, i) => s + (i.proteina ?? 0), 0);
              return (
                <MealPlanCard
                  key={meal.id}
                  title={meal.title}
                  icon={meal.icon}
                  kcal={mealKcal}
                  proteina={mealProteina}
                  items={items}
                  onAddCarb={() => handleOpenModal(meal, 'carb')}
                  onAddProtein={() => handleOpenModal(meal, 'protein')}
                  onDeleteItem={(itemId) => handleDeleteItem(meal.id, itemId)}
                />
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>

      <AddMealModal
        visible={modalVisible}
        mealTitle={selectedMeal?.title ?? ''}
        type={modalType}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </ImageBackground>
  );
}
