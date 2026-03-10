import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BottomNav } from '@/components/BottomNav';
import { colors } from '@/constants/colors';
import { styles } from './styles';

const backgroundImage = require('@/assets/background-food.jpg');
const logoImage = require('@/assets/diet-track-logo.png');

type ActivityLevel = 'sedentario' | 'moderado' | 'intenso';

const ACTIVITY_OPTIONS: { id: ActivityLevel; label: string; description: string; multiplier: number }[] = [
  { id: 'sedentario', label: 'Sedentário', description: 'Pouca ou nenhuma atividade • 1.6g/kg', multiplier: 1.6 },
  { id: 'moderado', label: 'Moderado', description: 'Treina 3-4x por semana • 1.8g/kg', multiplier: 1.8 },
  { id: 'intenso', label: 'Intenso', description: 'Treina 5-7x por semana • 2g/kg', multiplier: 2.0 },
];

function computeProtein(weight: string, activity: ActivityLevel): string | null {
  const kg = parseFloat(weight);
  if (!kg || kg <= 0) return null;
  const multiplier = ACTIVITY_OPTIONS.find((o) => o.id === activity)?.multiplier ?? 1.8;
  return `${Math.round(kg * multiplier)}g`;
}

export function Meta() {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderado');

  const proteinGoal = computeProtein(weight, activityLevel);
  const selectedActivity = ACTIVITY_OPTIONS.find((o) => o.id === activityLevel)!;
  const formulaLabel = weight
    ? `${weight}kg x ${selectedActivity.multiplier}g/kg`
    : '—';

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar style="light" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Meta de Proteínas</Text>
            <Text style={styles.headerSubtitle}>Calcule com base no seu peso e atividade</Text>
          </View>
          <View style={styles.headerRight}>
            <Image source={logoImage} style={{ width: 100, height: 40 }} resizeMode="contain" />
          </View>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultCardTitle}>Sua meta diária de proteínas</Text>
          <Text style={styles.resultCardValue}>{proteinGoal ?? '—'}</Text>
          <Text style={styles.resultCardFormula}>{formulaLabel}</Text>
        </View>

        <View style={styles.mainCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionCardTitle}>Seu peso corporal</Text>
              <View style={styles.weightInputRow}>
                <TextInput
                  style={styles.weightInput}
                  placeholder="Ex: 75"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                  maxLength={5}
                />
                <Text style={styles.weightUnit}>Kg</Text>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionCardTitle}>Nível de atividade</Text>
              {ACTIVITY_OPTIONS.map((option, index) => {
                const isSelected = activityLevel === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.activityOption,
                      index > 0 && styles.activityOptionBorder,
                    ]}
                    onPress={() => setActivityLevel(option.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.radioOuter}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                    <View style={styles.activityOptionContent}>
                      <Text style={styles.activityOptionTitle}>{option.label}</Text>
                      <Text style={styles.activityOptionSubtitle}>{option.description}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <BottomNav activeTab="meta" />
      </SafeAreaView>
    </ImageBackground>
  );
}
