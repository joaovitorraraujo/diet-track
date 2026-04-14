import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { colors } from '@/constants/colors';

const backgroundImage = require('@/assets/background-food.jpg');
const logoImage = require('@/assets/diet-track-logo.png');

const MEALS = [
  {
    id: '1',
    title: 'Café da manhã',
    subtitle: '700 kcal • 7h30',
    icon: 'weather-sunny' as const,
    completed: true,
  },
  {
    id: '2',
    title: 'Almoço',
    subtitle: '700 kcal',
    icon: 'silverware-fork-knife' as const,
    completed: false,
  },
  {
    id: '3',
    title: 'Lanche da tarde',
    subtitle: '700 kcal',
    icon: 'cup-outline' as const,
    completed: false,
  },
  {
    id: '4',
    title: 'Jantar',
    subtitle: '700 kcal',
    icon: 'weather-night' as const,
    completed: false,
  },
];

function formatDate() {
  const date = new Date();
  const days = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];
  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}`;
}

export function Home() {
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar style="light" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Minha Dieta</Text>
            <Text style={styles.headerDate}>{formatDate()}</Text>
          </View>
          <View style={styles.headerRight}>
            <Image source={logoImage} style={{ width: 100, height: 40 }} resizeMode="contain" />
          </View>
        </View>

        <TouchableOpacity style={styles.goalCard} activeOpacity={0.8}>
          <View style={styles.goalCardIconContainer}>
            <MaterialCommunityIcons
              name="calculator"
              size={30}
              color={colors.primary}
            />
          </View>
          <View style={styles.goalCardContent}>
            <Text style={styles.goalCardTitle}>Defina sua meta</Text>
            <Text style={styles.goalCardSubtitle}>Calcule sua necessidade de proteínas</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textDark} />
        </TouchableOpacity>

        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>Refeições de hoje</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {MEALS.map((meal) => (
              <TouchableOpacity
                key={meal.id}
                style={[
                  styles.mealCard,
                  meal.completed && styles.mealCardCompleted,
                ]}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name={meal.icon}
                  size={40}
                  color={meal.completed ? colors.primary : colors.textMuted}
                  style={styles.mealCardIcon}
                />
                <View style={styles.mealCardContent}>
                  <Text style={styles.mealCardTitle}>{meal.title}</Text>
                  <Text style={styles.mealCardSubtitle}>{meal.subtitle}</Text>
                </View>
                <View
                  style={[
                    styles.mealCardCheck,
                    !meal.completed && styles.mealCardCheckPending,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="check"
                    size={30}
                    color={meal.completed ? colors.white : colors.textMuted}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
