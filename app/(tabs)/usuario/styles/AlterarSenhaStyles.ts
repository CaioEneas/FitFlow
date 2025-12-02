/* --- app/(tabs)/usuario/styles/AlterarSenhaStyles.ts --- */
/* Estilos para a tela de Alterar Senha */

import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#1C1C1E', // Fundo escuro
  brandRed: '#E63946',   // Vermelho
  textLight: '#FFFFFF',  // Branco
  textGray: '#8A8A8E',   // Cinza
  inputBackground: '#2C2C2E', // Fundo do input
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: COLORS.textGray,
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLORS.brandRed,
    borderRadius: 8,
    paddingVertical: 6,
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 10,
    borderColor: COLORS.textGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
  },
});