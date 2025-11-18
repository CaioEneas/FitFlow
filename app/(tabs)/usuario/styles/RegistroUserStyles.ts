/* --- app/(tabs)/usuario/styles/RegistroUserStyles.ts --- */
/* Estilos da tela de Cadastro */

import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#1C1C1E',
  brandRed: '#E63946',
  inputBackground: '#2C2C2E',
  textLight: '#FFFFFF',
  textGray: '#8A8A8E',
};

export const styles = StyleSheet.create({
  // Container principal
  blackContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Conteúdo do ScrollView
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
  },
  // Container da Logo
  imageWrapper: {
    alignSelf: 'center',
    marginBottom: 30, 
  },
  // Estilo da Logo 
  image: {
    width: 400,
    height: 240,
    resizeMode: 'contain',
  },
  // Estilo dos Inputs
  input: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: COLORS.inputBackground,
  },
  // Estilo do Botão "Cadastrar"
  button: {
    backgroundColor: COLORS.brandRed,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  // Container da seção "Já tem uma conta?"
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  // Estilo do texto "Já tem uma conta?"
  loginText: {
    color: COLORS.textLight,
    fontSize: 16,
  },
  // Estilo do link "Faça login"
  linkRedInGroup: {
    color: COLORS.brandRed,
    fontWeight: 'bold',
    fontSize: 16,
  },
});