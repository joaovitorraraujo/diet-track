import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    opacity: 0.59,
  },
  safeArea: {
    flex: 1,
  },
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
  statsCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: colors.cardBackground,
    borderRadius: 31,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.9,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 21.3,
    elevation: 8,
  },
  statsColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statsLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.textDark,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 4, height: 7 },
    textShadowRadius: 10,
  },
  statsDivider: {
    width: 1,
    height: 56,
    backgroundColor: colors.inputBorder,
    opacity: 0.5,
  },
  mainCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    paddingHorizontal: 24,
    paddingTop: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 24,
    opacity: 0.9,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});
