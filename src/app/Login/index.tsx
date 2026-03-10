import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { styles } from './styles';

export function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login page!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

