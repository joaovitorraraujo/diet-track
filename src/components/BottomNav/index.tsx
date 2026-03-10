import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/routes';
import { colors } from '@/constants/colors';
import { styles } from './styles';

export type BottomNavTab = 'home' | 'meta' | 'alimentos' | 'dieta';

const TABS: {
  id: BottomNavTab;
  label: string;
  icon: 'home' | 'calculator' | 'magnify' | 'food';
  route: keyof RootStackParamList;
}[] = [
  { id: 'home', label: 'Início', icon: 'home', route: 'Home' },
  { id: 'meta', label: 'Meta', icon: 'calculator', route: 'Meta' },
  { id: 'alimentos', label: 'Alimentos', icon: 'magnify', route: 'Alimentos' },
  { id: 'dieta', label: 'Dieta', icon: 'food', route: 'Dieta' },
];

type BottomNavProps = {
  activeTab: BottomNavTab;
};

export function BottomNav({ activeTab }: BottomNavProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.item, isActive ? styles.itemActive : styles.itemInactive]}
            onPress={() => !isActive && navigation.navigate(tab.route)}
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
