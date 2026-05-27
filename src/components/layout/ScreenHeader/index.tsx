import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { logoImage } from '@/assets';
import { useAuth } from '@/contexts/AuthContext';

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
};

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  const { signOut } = useAuth();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={signOut} style={styles.logoutButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="logout" size={22} color="rgba(255,255,255,0.9)" />
        </TouchableOpacity>
        <Image source={logoImage} style={{ width: 100, height: 40 }} resizeMode="contain" />
      </View>
    </View>
  );
}
