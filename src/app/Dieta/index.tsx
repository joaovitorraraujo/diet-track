import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MealPlanCard } from '@/components/pages/Dieta/MealPlanCard';
import { AddMealModal } from '@/components/pages/Dieta/AddMealModal';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { styles } from './styles';
import { backgroundImage } from '@/assets';
import { useDieta } from '@/hooks/useDieta';
import { MEALS } from '@/mocks/meals';

export function Dieta() {
  const {
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
  } = useDieta();

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
