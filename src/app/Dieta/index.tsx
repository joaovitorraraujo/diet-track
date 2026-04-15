import { useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MealPlanCard } from '@/components/MealPlanCard';
import { AddMealModal } from '@/components/AddMealModal';
import { styles } from './styles';

const backgroundImage = require('@/assets/background-food.jpg');
const logoImage = require('@/assets/diet-track-logo.png');

const MEALS = [
  { id: '1', title: 'Café da Manhã', icon: 'weather-sunny' as const },
  { id: '2', title: 'Almoço', icon: 'silverware-fork-knife' as const },
  { id: '3', title: 'Lanche da tarde', icon: 'cup-outline' as const },
  { id: '4', title: 'Janta', icon: 'weather-night' as const },
];

export function Dieta() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<{ id: string; title: string } | null>(null);

  function handleOpenModal(meal: { id: string; title: string }) {
    setSelectedMeal(meal);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedMeal(null);
  }

  function handleConfirm(_alimento: string, _gramas: string, _kcal: string) {
    setModalVisible(false);
    setSelectedMeal(null);
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar style="light" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Plano Alimentar</Text>
            <Text style={styles.headerSubtitle}>Crie seu plano alimentar do dia</Text>
          </View>
          <View style={styles.headerRight}>
            <Image source={logoImage} style={{ width: 100, height: 40 }} resizeMode="contain" />
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statsColumn}>
            <Text style={styles.statsLabel}>Proteínas</Text>
            <Text style={styles.statsValue}>108g</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsColumn}>
            <Text style={styles.statsLabel}>Total de Kcal</Text>
            <Text style={styles.statsValue}>3.000</Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {MEALS.map((meal) => (
              <MealPlanCard
                key={meal.id}
                title={meal.title}
                icon={meal.icon}
                onAddPress={() => handleOpenModal(meal)}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>

      <AddMealModal
        visible={modalVisible}
        mealTitle={selectedMeal?.title ?? ''}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </ImageBackground>
  );
}
