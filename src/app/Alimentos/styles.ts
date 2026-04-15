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
  searchContainer: {
    marginHorizontal: 24,
    marginBottom: 12,
    backgroundColor: colors.cardBackground,
    borderRadius: 18,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 21.3,
    elevation: 6,
    opacity: 0.95,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textDark,
  },
  mainCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    paddingTop: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 13.8,
    elevation: 24,
    opacity: 0.9,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  categoryLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
    opacity: 0.7,
    marginBottom: 14,
    marginLeft: 4,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 40,
  },
});
