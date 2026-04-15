import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { styles } from './styles';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

type MealPlanCardProps = {
  title: string;
  icon: IconName;
  kcal: number;
  onAddPress: () => void;
};

export function MealPlanCard({ title, icon, kcal, onAddPress }: MealPlanCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialCommunityIcons name={icon} size={40} color={colors.primary} style={styles.icon} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {kcal > 0 ? `${kcal} kcal adicionados` : 'Nenhuma refeição adicionada'}
          </Text>
        </View>
        {kcal > 0 && <Text style={styles.kcalBadge}>{kcal} kcal</Text>}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress} activeOpacity={0.7}>
        <MaterialCommunityIcons name="plus" size={18} color={colors.primary} />
        <Text style={styles.addText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
