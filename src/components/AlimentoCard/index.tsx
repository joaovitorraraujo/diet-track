import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { styles } from './styles';

export type Alimento = {
  id: string;
  nome: string;
  proteinaPor100g: number;
  categoria: string;
};

type AlimentoCardProps = {
  alimento: Alimento;
  isExpanded: boolean;
  onToggle: () => void;
};

export function AlimentoCard({ alimento, isExpanded, onToggle }: AlimentoCardProps) {
  const [gramas, setGramas] = useState('100');

  const proteínaTotal =
    gramas.length > 0
      ? Math.round((parseFloat(gramas) / 100) * alimento.proteinaPor100g)
      : 0;

  if (isExpanded) {
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={onToggle} activeOpacity={0.8}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nameText}>{alimento.nome}</Text>
              <Text style={styles.expandedSubtitle}>
                {alimento.proteinaPor100g}g proteína / 100g
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-up"
              size={25}
              color={colors.textMuted}
            />
          </View>
        </TouchableOpacity>

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
          />
          <Text style={styles.gramUnit}>g</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Proteínas total</Text>
          <Text style={styles.totalValue}>{proteínaTotal}g</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onToggle} activeOpacity={0.8}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nameText}>{alimento.nome}</Text>
          <Text style={styles.subtitleText}>por 100g</Text>
        </View>
        <Text style={styles.proteinBadge}>{alimento.proteinaPor100g}g</Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={25}
          color={colors.textMuted}
        />
      </View>
    </TouchableOpacity>
  );
}
