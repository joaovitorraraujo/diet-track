import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4.8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
    flex: 1,
  },
  subtitleText: {
    fontSize: 16,
    color: colors.textMuted,
    marginTop: 2,
  },
  proteinBadge: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 8,
  },
  expandedSubtitle: {
    fontSize: 16,
    color: colors.textMuted,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.inputBorder,
    marginVertical: 14,
    opacity: 0.5,
  },
  gramRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 13,
    paddingHorizontal: 16,
    height: 48,
  },
  gramInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
  },
  gramUnit: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textMuted,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.textMuted,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
});
