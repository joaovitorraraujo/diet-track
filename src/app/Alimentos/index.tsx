import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';

const backgroundImage = require('@/assets/background-food.jpg');

export function Alimentos() {
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar style="light" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Text style={styles.title}>Alimentos</Text>
        <Text style={styles.subtitle}>Em breve poderás pesquisar e registar alimentos.</Text>
      </SafeAreaView>
    </ImageBackground>
  );
}
