import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { styles } from './styles';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import type { RootStackParamList } from '@/routes';

const backgroundImage = require('@/assets/background-food.jpg');
const logoImage = require('@/assets/diet-track-logo.png');

const loginSchema = z.object({
  email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  function onSubmit(_data: LoginFormData) {
    navigation.navigate('Main');
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar style="light" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.card}>
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tabActive}>
              <Text style={styles.tabActiveText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabInactive} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.tabInactiveText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Bem vindo de volta ao seu app de refeições preferido
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Seu email"
                iconName="email-outline"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Sua senha"
                iconName="lock-outline"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
              />
            )}
          />

          <Button title="Entrar" variant="primary" onPress={handleSubmit(onSubmit)} />

          <Text style={styles.orText}>Ou entre com</Text>

          <Button title="Google" variant="google" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
