const ERROR_MAP: Record<string, string> = {
  // Login
  'invalid login credentials': 'Email ou senha incorretos.',
  'invalid_credentials': 'Email ou senha incorretos.',
  'email not confirmed': 'Email não confirmado. Verifique sua caixa de entrada.',
  'email_not_confirmed': 'Email não confirmado. Verifique sua caixa de entrada.',

  // Cadastro
  'user already registered': 'Este email já possui uma conta cadastrada.',
  'email address is invalid': 'Formato de email inválido.',

  // Senha
  'password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
  'weak password': 'Senha muito fraca. Use pelo menos 6 caracteres.',

  // Reset de senha
  'for security purposes, you can only request this once every 60 seconds':
    'Por segurança, aguarde 60 segundos antes de tentar novamente.',

  // Rate limit
  'email rate limit exceeded': 'Muitas tentativas. Tente novamente mais tarde.',
  'too many requests': 'Muitas tentativas. Tente novamente mais tarde.',

  // Rede / genérico
  'fetch failed': 'Sem conexão com a internet. Verifique sua rede.',
  'network request failed': 'Sem conexão com a internet. Verifique sua rede.',
};

export function translateAuthError(message: string): string {
  const lower = message.toLowerCase();

  for (const [key, translation] of Object.entries(ERROR_MAP)) {
    if (lower.includes(key)) {
      return translation;
    }
  }
  return message;
}
