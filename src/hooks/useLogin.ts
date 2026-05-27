import { useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import * as authService from '@/services/authService';
import { translateAuthError } from '@/util/translateAuthError';

const loginSchema = z.object({
  email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function useLogin() {
  const { signIn, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setApiError(null);
    try {
      await signIn(data);
    } catch (err) {
      const raw = err instanceof Error ? err.message : 'Erro ao fazer login';
      setApiError(translateAuthError(raw));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    setApiError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      const raw = err instanceof Error ? err.message : 'Erro ao entrar com Google';
      setApiError(translateAuthError(raw));
    } finally {
      setIsGoogleLoading(false);
    }
  }

  function openForgotModal() {
    setIsForgotModalOpen(true);
  }

  function closeForgotModal() {
    setIsForgotModalOpen(false);
  }

  async function handleForgotPasswordSubmit(email: string) {
    setIsForgotLoading(true);
    try {
      await authService.resetPassword(email);
      setIsForgotModalOpen(false);
      Alert.alert(
        'Email enviado! ✉️',
        `Enviamos um link de redefinição para ${email}. Verifique sua caixa de entrada.`,
      );
    } catch (err) {
      const raw = err instanceof Error ? err.message : 'Erro ao enviar email';
      Alert.alert('Erro', translateAuthError(raw));
    } finally {
      setIsForgotLoading(false);
    }
  }

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    isGoogleLoading,
    isForgotLoading,
    isForgotModalOpen,
    currentEmail: getValues('email'),
    apiError,
    onSubmit,
    handleGoogleSignIn,
    openForgotModal,
    closeForgotModal,
    handleForgotPasswordSubmit,
  };
}
