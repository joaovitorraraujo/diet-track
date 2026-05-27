import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  primaryContainer: {
    backgroundColor: colors.primary,
    borderRadius: 42,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10.8,
    elevation: 6,
    marginBottom: 8,
  },
  primaryText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  googleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 42,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4.8,
    elevation: 10,
  },
  googleIcon: {
    marginRight: 8,
  },
  googleText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.textDark,
  },
  disabled: {
    opacity: 0.6,
  },
});
