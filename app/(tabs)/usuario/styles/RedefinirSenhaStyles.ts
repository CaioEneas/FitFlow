/* --- app/(tabs)/usuario/styles/RedefinirSenhaStyles.ts --- */
/* Estilos para a tela de Redefinição de Senha */

import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#1C1C1E', // Fundo escuro
  brandRed: '#E63946',   // Vermelho
  textLight: '#FFFFFF',  // Branco
  textGray: '#8A8A8E',   // Cinza
  inputBackground: '#2C2C2E', // Fundo do input
};

export const styles = StyleSheet.create({
  // Container Principal
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'center', // Centraliza verticalmente
  },
  
  // Título e Subtítulo
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textGray,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  // Campos de Texto
  input: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
  },

  // Botão de Ação
  button: {
    width: '100%',
    paddingVertical: 8,
    backgroundColor: COLORS.brandRed,
    borderRadius: 8,
    marginTop: 10,
  },

  // Botão de Voltar (Texto)
  backLink: {
    marginTop: 20,
    textAlign: 'center',
    color: COLORS.textGray,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});