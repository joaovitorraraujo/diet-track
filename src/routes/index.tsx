import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../app/Login';
import { Register } from '../app/Register';
import { Home } from '@/app/Home';
import { Meta } from '@/app/Meta';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Meta: undefined;
  Alimentos: undefined;
  Dieta: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Meta" component={Meta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
