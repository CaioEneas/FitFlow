/* --- app/(tabs)/usuario/_styles/LoginScreenStyles.ts --- */
/* Estilos da tela de Login para o tema FitFlow */

// Importa o StyleSheet do React Native
import { StyleSheet } from 'react-native';

// --- PALETA DE CORES ---
const COLORS = {
  background: '#1C1C1E', // Fundo escuro
  brandRed: '#E63946',   // Vermelho
  inputBackground: '#2C2C2E', // Fundo do Input
  textLight: '#FFFFFF',  // Texto branco
  textGray: '#8A8A8E',   // Texto cinza
};

// 'export const styles' permite que o 'Login.tsx' importe estes estilos
export const styles = StyleSheet.create({
  // Estilo do container principal
  blackContainer: {
    flex: 1, // Ocupa a tela inteira
    backgroundColor: COLORS.background, // Fundo escuro
  },
  // Estilo do conteúdo do ScrollView
  scrollContent: {
    flexGrow: 1, // Garante que o conteúdo possa crescer
    justifyContent: 'center', // Centraliza verticalmente
    padding: 25, // Espaçamento interno
  },
  // Container da Logo
  imageWrapper: {
    alignSelf: 'center', // Centraliza horizontalmente
    marginBottom: 30, // Margem inferior
  },
  // Estilo da Logo
  image: {
    width: 400,
    height: 240,
    resizeMode: 'contain', // Garante que a imagem apareça inteira
  },
  // Estilo dos Inputs (Email e Senha)
  input: {
    width: '100%', // Largura total
    marginBottom: 10, // Margem inferior
    borderRadius: 10,
    backgroundColor: COLORS.inputBackground, // Fundo cinza escuro
  },
  // Estilo do Botão "Entrar"
  button: {
    backgroundColor: COLORS.brandRed, // Fundo vermelho
    borderRadius: 10, // Bordas arredondadas
    marginTop: 20, // Margem superior
    elevation: 3, // Sombra (Android)
  },
  // Estilo dos links vermelhos
  linkRed: {
    marginTop: 18,
    textAlign: 'center', // Centralizado
    color: COLORS.brandRed, // Cor vermelha
    fontWeight: 'bold',
    fontSize: 18,
  },
  // Específico somente para que o "Cadastre-se" fique alinhado na horizontal
  linkRedInGroup: {
  color: COLORS.brandRed,
  fontWeight: 'bold',
  fontSize: 16,
},
  // Container do divisor "--- ou ---"
  dividerContainer: {
    flexDirection: 'row', // Alinha os filhos na horizontal
    alignItems: 'center', // Alinha os filhos no centro (vertical)
    marginTop: 20,
    marginBottom: 10,
  },
  // Estilo das linhas "---"
  dividerLine: {
    flex: 1, // Ocupa todo o espaço disponível
    height: 1, // Altura de 1 pixel
    backgroundColor: COLORS.textGray, // Cor cinza
    opacity: 0.5, // Meio transparente
  },
  // Estilo do texto "ou"
  dividerText: {
    color: COLORS.textGray,
    marginHorizontal: 10, // Espaço dos lados
  },
  // Container da seção "Cadastre-se"
  registerContainer: {
    flexDirection: 'row', // Alinha na horizontal
    justifyContent: 'center', // Centraliza
    marginTop: 10,
  },
  // Estilo do texto "Não tem uma conta?"
  registerText: {
    color: COLORS.textLight, // Cor branca
    fontSize: 14,
  },
});