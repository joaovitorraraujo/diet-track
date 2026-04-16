import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { styles } from './styles';
import { colors } from '@/constants/colors';
import type { MainTabParamList } from '@/routes';
import { formatDate } from '@/util/formatDate';
import { MEALS } from '@/mocks/meals';
import { backgroundImage } from '@/assets';

export function Home() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar style="light" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScreenHeader title="Minha Dieta" subtitle={formatDate()} />

        <TouchableOpacity style={styles.goalCard} activeOpacity={0.8} onPress={() => navigation.navigate('Meta')}>
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
