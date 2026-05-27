import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller } from 'react-hook-form';
import { styles } from './styles';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { RootStackParamList } from '@/routes';
import { backgroundImage, logoImage } from '@/assets';
import { useRegister } from '@/hooks/useRegister';
import { useLogin } from '@/hooks/useLogin';

export function Register() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { control, handleSubmit, errors, isLoading, apiError, successMessage, onSubmit } = useRegister();
  const { handleGoogleSignIn, isGoogleLoading } = useLogin();

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
            <TouchableOpacity style={styles.tabInactive} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.tabInactiveText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabActive}>
              <Text style={styles.tabActiveText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Cadastre-se no seu app de refeições preferido
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
                keyboardType="email-address"
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Confirme sua senha"
                iconName="lock-outline"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          {!!apiError && <Text style={styles.apiError}>{apiError}</Text>}
          {!!successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}

          <Button
            title={isLoading ? 'Cadastrando...' : 'Cadastrar'}
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          />

          <Text style={styles.orText}>Ou entre com</Text>

          <Button
            title={isGoogleLoading ? 'Aguarde...' : 'Google'}
            variant="google"
            onPress={handleGoogleSignIn}
            disabled={isGoogleLoading}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
