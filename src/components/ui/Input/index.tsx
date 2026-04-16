import { Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { colors } from '@/constants/colors';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

type InputProps = {
  placeholder?: string;
  iconName: IconName;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  keyboardType?: React.ComponentProps<typeof TextInput>['keyboardType'];
  maxLength?: number;
};

export function Input({ placeholder, iconName, secureTextEntry = false, value, onChangeText, error, keyboardType, maxLength }: InputProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, !!error && styles.containerError]}>
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={error ? colors.error : colors.textMuted}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secureTextEntry}
          editable={true}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
