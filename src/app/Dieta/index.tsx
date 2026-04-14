import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';

const backgroundImage = require('@/assets/background-food.jpg');

export function Dieta() {
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar style="light" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Text style={styles.title}>Dieta</Text>
        <Text style={styles.subtitle}>Planeamento da dieta virá neste separador.</Text>
      </SafeAreaView>
    </ImageBackground>
  );
}
