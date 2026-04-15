import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4.8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  kcalBadge: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: 'hidden',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    gap: 4,
  },
  addText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.primary,
  },
});
