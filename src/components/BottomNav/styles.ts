import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 9.7,
    elevation: 8,
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  itemActive: {
    opacity: 1,
  },
  itemInactive: {
    opacity: 0.6,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 4,
  },
  labelActive: {
    color: colors.primaryText,
  },
  labelInactive: {
    color: colors.textDark,
  },
});
