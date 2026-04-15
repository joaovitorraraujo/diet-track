import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 13.8,
    elevation: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.inputBackgroundAlt,
    borderRadius: 42,
    padding: 6,
    marginBottom: 20,
  },
  tabActive: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 42,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4.8,
    elevation: 3,
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabActiveText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
  },
  tabInactiveText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.textMuted,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  forgotButton: {
    alignSelf: 'center',
    marginTop: 12,
  },
  forgotText: {
    fontSize: 13,
    color: colors.primaryText,
    textDecorationLine: 'underline',
  },
  orText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.textMuted,
    marginVertical: 16,
  },
});
