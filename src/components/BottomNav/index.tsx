import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '@/routes/types';
import { colors } from '@/constants/colors';
import { styles } from './styles';

const TAB_META: Record<
  keyof MainTabParamList,
  { label: string; icon: 'home' | 'calculator' | 'magnify' | 'food' }
> = {
  Home: { label: 'Início', icon: 'home' },
  Meta: { label: 'Meta', icon: 'calculator' },
  Alimentos: { label: 'Alimentos', icon: 'magnify' },
  Dieta: { label: 'Dieta', icon: 'food' },
};

export function BottomNav({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: 24 + insets.bottom }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const meta = TAB_META[route.name as keyof MainTabParamList];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={meta.label}
            onPress={onPress}
            style={[styles.item, isFocused ? styles.itemActive : styles.itemInactive]}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={meta.icon}
              size={30}
              color={isFocused ? colors.primary : colors.textDark}
            />
            <Text style={[styles.label, isFocused ? styles.labelActive : styles.labelInactive]}>
              {meta.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
