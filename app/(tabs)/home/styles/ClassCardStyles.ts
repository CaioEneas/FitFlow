/* --- app/(tabs)/home/styles/ClassCardStyles.ts --- */
/* (Versão ATUALIZADA com estilos para Professor e Academia) */

import { StyleSheet } from 'react-native';

const COLORS = {
  textLight: '#FFFFFF',
  infoIcon: '#f1f1f1ff', 
  surface: '#2C2C2E',
};

export const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '100%',
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textLight,
    // MUDANÇA: Aumentamos a margem para dar espaço
    marginBottom: 8, 
  },
  
  // --- MUDANÇA: Renomeado de 'timeContainer' para 'infoRow' ---
  // Este estilo agora é genérico para qualquer linha de info
  infoRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 5, // Adiciona um pequeno espaço entre as linhas
  },

  icon: {
    marginRight: 6,
  },

  // Estilo de texto genérico para as infos
  infoText: {
    fontSize: 14,
    color: COLORS.infoIcon,
    fontWeight: '500',
  },
});