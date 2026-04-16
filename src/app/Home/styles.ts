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
  goalCard: {
    marginHorizontal: 24,
    opacity: 0.9,
    marginBottom: 24,
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 21.3,
    elevation: 8,
  },
  goalCardIconContainer:{
    backgroundColor: colors.white,
    borderRadius: 100,
    padding: 12,
    marginRight: 16,
  },
  goalCardContent: {
    flex: 1,
  },
  goalCardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
  },
  goalCardSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  mainCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -24 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 24,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 16,
    marginLeft: 14,
  },
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  mealCardCompleted: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
    opacity: 0.8,
  },
  mealCardIcon: {
    marginRight: 16,
  },
  mealCardContent: {
    flex: 1,
  },
  mealCardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
  },
  mealCardSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  mealCardCheck: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealCardCheckPending: {
    backgroundColor: colors.inputBackgroundAlt,
  },
});
