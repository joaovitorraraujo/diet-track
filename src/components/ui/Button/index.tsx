import { Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

type ButtonVariant = 'primary' | 'google';

type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
  onPress?: () => void;
  disabled?: boolean;
};

export function Button({ title, variant = 'primary', onPress, disabled = false }: ButtonProps) {
  if (variant === 'google') {
    return (
      <TouchableOpacity
        style={[styles.googleContainer, disabled && styles.disabled]}
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <AntDesign name="google" size={28} color="#EA4335" style={styles.googleIcon} />
        <Text style={styles.googleText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.primaryContainer, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.primaryText}>{title}</Text>
    </TouchableOpacity>
  );
}
