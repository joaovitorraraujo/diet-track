import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { styles } from './styles';

export type BottomNavTab = 'home' | 'meta' | 'alimentos' | 'dieta';

const TABS: { id: BottomNavTab; label: string; icon: 'home' | 'calculator' | 'magnify' | 'food' }[] = [
  { id: 'home', label: 'Início', icon: 'home' },
  { id: 'meta', label: 'Meta', icon: 'calculator' },
  { id: 'alimentos', label: 'Alimentos', icon: 'magnify' },
  { id: 'dieta', label: 'Dieta', icon: 'food' },
];

type BottomNavProps = {
  activeTab: BottomNavTab;
  onTabPress?: (tab: BottomNavTab) => void;
};

export function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.item, isActive ? styles.itemActive : styles.itemInactive]}
            onPress={() => onTabPress?.(tab.id)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={tab.icon}
              size={30}
              color={isActive ? colors.primary : colors.textDark}
            />
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
