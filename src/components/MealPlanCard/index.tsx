import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { styles } from './styles';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

type MealPlanCardProps = {
  title: string;
  icon: IconName;
  onAddPress: () => void;
};

export function MealPlanCard({ title, icon, onAddPress }: MealPlanCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialCommunityIcons name={icon} size={40} color={colors.primary} style={styles.icon} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Nenhuma refeição adicionada</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress} activeOpacity={0.7}>
        <MaterialCommunityIcons name="plus" size={18} color={colors.primary} />
        <Text style={styles.addText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
