import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    textShadowColor: colors.black,
    textShadowOffset: { width: 4, height: 2 },
    textShadowRadius: 20,
  },
  headerSubtitle: {
    fontSize: 15,
    color: colors.white,
    marginTop: 4,
    textShadowColor: colors.black,
    textShadowOffset: { width: 4, height: 1 },
    textShadowRadius: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
