import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

const registerSchema = z
  .object({
    email: z.string().min(1, "Email obrigatório").email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function useRegister() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);
    try {
      await signUp({ email: data.email, password: data.password });
      setSuccessMessage(
        "Cadastro realizado! Verifique seu e-mail para confirmar a conta.",
      );
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Erro ao cadastrar");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    apiError,
    successMessage,
    onSubmit,
  };
}
