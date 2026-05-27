import { useEffect, useRef, useState } from 'react';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { styles } from './styles';

import type { Alimento } from '@/types/alimento';

type AlimentoCardProps = {
  alimento: Alimento;
  isExpanded: boolean;
  onToggle: () => void;
};

export function AlimentoCard({ alimento, isExpanded, onToggle }: AlimentoCardProps) {
  const [gramas, setGramas] = useState('100');

  const rotationAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    rotationAnim.stopAnimation();
    Animated.timing(rotationAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const chevronRotate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const proteínaTotal =
    gramas.length > 0
      ? Math.round((parseFloat(gramas) / 100) * alimento.proteinaPor100g)
      : 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onToggle} activeOpacity={0.8}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nameText}>{alimento.nome}</Text>
          <Text style={styles.subtitleText}>
            {isExpanded
              ? `${alimento.proteinaPor100g}g proteína / 100g`
              : 'por 100g'}
          </Text>
        </View>
        {!isExpanded && (
          <Text style={styles.proteinBadge}>{alimento.proteinaPor100g}g</Text>
        )}
        <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
          <MaterialCommunityIcons name="chevron-down" size={25} color={colors.textMuted} />
        </Animated.View>
      </View>

      {isExpanded && (
        <View>
          <View style={styles.divider} />

          <View style={styles.gramRow}>
            <TextInput
              style={styles.gramInput}
              value={gramas}
              onChangeText={setGramas}
              keyboardType="numeric"
              placeholder="100"
              placeholderTextColor={colors.textMuted}
              maxLength={6}
              underlineColorAndroid="transparent"
            />
            <Text style={styles.gramUnit}>g</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Proteínas total</Text>
            <Text style={styles.totalValue}>{proteínaTotal}g</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
