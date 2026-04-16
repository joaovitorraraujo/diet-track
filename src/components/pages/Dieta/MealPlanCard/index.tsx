import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import type { MealItem } from '@/types/diet';
import { styles } from './styles';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

type MealPlanCardProps = {
  title: string;
  icon: IconName;
  kcal: number;
  proteina: number;
  items: MealItem[];
  onAddCarb: () => void;
  onAddProtein: () => void;
  onDeleteItem: (id: string) => void;
  photoUri?: string;
  onPickPhoto?: () => void;
};

export function MealPlanCard({
  title,
  icon,
  kcal,
  proteina,
  items,
  onAddCarb,
  onAddProtein,
  onDeleteItem,
  photoUri,
  onPickPhoto,
}: MealPlanCardProps) {
  const [expanded, setExpanded] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotationAnim, {
      toValue: expanded ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const chevronRotate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const hasItems = items.length > 0;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => hasItems && setExpanded((v) => !v)}
        activeOpacity={hasItems ? 0.7 : 1}
      >
        <TouchableOpacity onPress={onPickPhoto} activeOpacity={0.7}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <MaterialCommunityIcons name={icon} size={40} color={colors.primary} style={styles.icon} />
          )}
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {hasItems ? `${items.length} item(s) adicionado(s)` : 'Nenhuma refeição adicionada'}
          </Text>
        </View>
        <View style={styles.badgesCol}>
          {kcal > 0 && (
            <Text style={styles.kcalBadge}>{kcal} kcal</Text>
          )}
          {proteina > 0 && (
            <Text style={[styles.kcalBadge, styles.proteinBadge]}>{proteina}g prot</Text>
          )}
        </View>
        {hasItems && (
          <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
            <MaterialCommunityIcons name="chevron-down" size={24} color={colors.textMuted} />
          </Animated.View>
        )}
      </TouchableOpacity>

      {expanded && hasItems && (
        <View>
          <View style={styles.divider} />
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.alimento}</Text>
                <Text style={styles.itemMeta}>
                  {item.gramas}g • {item.kcal} kcal
                  {item.proteina ? ` • ${item.proteina}g prot` : ''}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDeleteItem(item.id)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="trash-can-outline" size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={styles.addRow}>
        <TouchableOpacity style={styles.addButton} onPress={onAddCarb} activeOpacity={0.7}>
          <MaterialCommunityIcons name="plus" size={16} color={colors.primary} />
          <Text style={styles.addText}>Carboidrato</Text>
        </TouchableOpacity>
        <View style={styles.addDivider} />
        <TouchableOpacity style={styles.addButton} onPress={onAddProtein} activeOpacity={0.7}>
          <MaterialCommunityIcons name="plus" size={16} color={colors.primary} />
          <Text style={styles.addText}>Proteína</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
