import {
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { colors } from '@/constants/colors';
import { styles } from './styles';
import { backgroundImage } from '@/assets';
import { useMeta } from '@/hooks/useMeta';
import { ACTIVITY_OPTIONS } from '@/mocks/activityOptions';

export function Meta() {
  const { weight, setWeight, activityLevel, setActivityLevel, proteinGoal, formulaLabel } = useMeta();

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar style="light" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScreenHeader title="Meta de Proteínas" subtitle="Calcule com base no seu peso e atividade" />

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
      </SafeAreaView>
    </ImageBackground>
  );
}
