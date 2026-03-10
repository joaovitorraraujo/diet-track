import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

const backgroundImage = require('@/assets/background-food.jpg');
const logoImage = require('@/assets/diet-track-logo.png');

export function Register() {
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
            <TouchableOpacity style={styles.tabInactive}>
              <Text style={styles.tabInactiveText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabActive}>
              <Text style={styles.tabActiveText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Cadastre-se no seu app de refeições preferido
          </Text>

          <Input placeholder="Seu email" iconName="email-outline" />
          <Input placeholder="Sua senha" iconName="lock-outline" secureTextEntry />
          <Input placeholder="Confirme sua senha" iconName="lock-outline" secureTextEntry />

          <Button title="Cadastrar" variant="primary" />

          <Text style={styles.orText}>Ou entre com</Text>

          <Button title="Google" variant="google" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
