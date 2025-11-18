/* Estilos para o nosso componente de Barra de Busca */
import { StyleSheet } from 'react-native';

// Nossa paleta de cores
const COLORS = {
  background: '#1C1C1E', // Fundo escuro
  surface: '#2C2C2E',    // Fundo do input
  textGray: '#8A8A8E',   // Texto cinza (placeholder)
  textLight: '#FFFFFF',  // Texto branco (digitado)
};

export const styles = StyleSheet.create({
  // O container principal da barra
  container: {
    backgroundColor: COLORS.surface, // Fundo cinza escuro
    borderRadius: 10, // Bordas arredondadas
    height: 50,
    marginTop: 8,
    marginBottom: 24, // Espaço extra abaixo da barra
    flexDirection: 'row', // Alinha o ícone e o input lado a lado
    alignItems: 'center', // Centraliza verticalmente
    paddingHorizontal: 15, // Espaçamento interno nas laterais
  },
  // O ícone de lupa
  icon: {
    marginRight: 10, // Espaço entre o ícone e o texto
  },
  // O campo de texto (TextInput)
  input: {
    flex: 1, // Faz o input ocupar todo o espaço restante
    height: '100%',
    color: COLORS.textLight, // Cor do texto que o usuário digita
    fontSize: 16,
  },
});