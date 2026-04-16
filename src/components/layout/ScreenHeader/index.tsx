import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import { logoImage } from '@/assets';

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
};

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.headerRight}>
        <Image source={logoImage} style={{ width: 100, height: 40 }} resizeMode="contain" />
      </View>
    </View>
  );
}
