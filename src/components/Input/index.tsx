import { TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { colors } from '../../constants/colors';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

type InputProps = {
  placeholder?: string;
  iconName: IconName;
  secureTextEntry?: boolean;
};

export function Input({ placeholder, iconName, secureTextEntry = false }: InputProps) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={colors.textMuted}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        secureTextEntry={secureTextEntry}
        editable={true}
      />
    </View>
  );
}
