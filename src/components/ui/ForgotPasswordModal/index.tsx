import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';

type ForgotPasswordModalProps = {
  visible: boolean;
  initialEmail?: string;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
};

export function ForgotPasswordModal({
  visible,
  initialEmail = '',
  isLoading,
  onClose,
  onSubmit,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState(initialEmail);

  function handleSubmit() {
    onSubmit(email.trim());
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Esqueci minha senha</Text>
          <Text style={styles.description}>
            Digite seu email e enviaremos um link para redefinir sua senha.
          </Text>

          <Input
            iconName="email-outline"
            placeholder="Seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Button
            title={isLoading ? 'Enviando...' : 'Enviar link'}
            variant="primary"
            onPress={handleSubmit}
            disabled={isLoading || !email.trim()}
          />

          <TouchableOpacity onPress={onClose} style={styles.cancelButton} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    gap: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  cancelButton: {
    alignSelf: 'center',
    paddingVertical: 4,
  },
  cancelText: {
    fontSize: 14,
    color: colors.textMuted,
    textDecorationLine: 'underline',
  },
});
