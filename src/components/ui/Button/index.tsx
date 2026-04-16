import { Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

type ButtonVariant = 'primary' | 'google';

type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
  onPress?: () => void;
};

export function Button({ title, variant = 'primary', onPress }: ButtonProps) {
  if (variant === 'google') {
    return (
      <TouchableOpacity style={styles.googleContainer} onPress={onPress} activeOpacity={0.8}>
        <AntDesign name="google" size={28} color="#EA4335" style={styles.googleIcon} />
        <Text style={styles.googleText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.primaryContainer} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.primaryText}>{title}</Text>
    </TouchableOpacity>
  );
}
