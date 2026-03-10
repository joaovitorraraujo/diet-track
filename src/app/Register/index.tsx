import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { styles } from './styles';

export function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register page!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

