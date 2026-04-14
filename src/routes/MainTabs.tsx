import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@/app/Home';
import { Meta } from '@/app/Meta';
import { Alimentos } from '@/app/Alimentos';
import { Dieta } from '@/app/Dieta';
import { BottomNav } from '@/components/BottomNav';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Meta" component={Meta} />
      <Tab.Screen name="Alimentos" component={Alimentos} />
      <Tab.Screen name="Dieta" component={Dieta} />
    </Tab.Navigator>
  );
}
