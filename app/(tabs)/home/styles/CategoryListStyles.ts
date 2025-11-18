/* --- app/(tabs)/home/styles/CategoryListStyles.ts --- */
/* Estilos para a lista horizontal de categorias (chips) */

import { StyleSheet } from 'react-native';

const COLORS = {
  brandRed: '#E63946',   // Vermelho
  surface: '#2C2C2E',    // Fundo (inativo)
  textLight: '#FFFFFF',  // Texto (ativo)
  textGray: '#8A8A8E',   // Texto (inativo)
};

export const styles = StyleSheet.create({
  // O container do chip (botão)
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Faz o chip ficar com bordas bem arredondadas
    marginRight: 12, // Espaço entre os chips
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Estilo do chip QUANDO ESTIVER ATIVO
  chipActive: {
    backgroundColor: COLORS.brandRed,
  },
  // Estilo do chip QUANDO ESTIVER INATIVO
  chipInactive: {
    backgroundColor: COLORS.surface,
  },
  // Estilo do texto do chip
  chipText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Estilo do texto QUANDO ESTIVER ATIVO
  textActive: {
    color: COLORS.textLight,
  },
  // Estilo do texto QUANDO ESTIVER INATIVO
  textInactive: {
    color: COLORS.textGray,
  },
});