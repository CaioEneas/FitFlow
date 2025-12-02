/* --- app/(tabs)/usuario/styles/PerfilStyles.ts --- */
/* Estilos para a tela "Perfil" com Histórico Dinâmico */

import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#1C1C1E',
  brandRed: '#E63946',
  textLight: '#FFFFFF',
  textGray: '#8A8A8E',
  surface: '#2C2C2E',
  successGreen: '#4CAF50', // Verde para sucesso
  cancelRed: '#FF5252',    // Vermelho para cancelado
};

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    alignItems: 'center', 
    paddingTop: 60, 
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  // --- Perfil ---
  avatar: {
    backgroundColor: COLORS.surface, 
    marginBottom: 20, 
  },
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: COLORS.textGray,
    marginBottom: 30,
  },

  // --- Botões ---
  buttonContainer: {
    width: '100%',
    marginBottom: 30,
    gap: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 6,
    backgroundColor: COLORS.brandRed,
    borderRadius: 8,
  },
  buttonLogout: {
    width: '100%',
    paddingVertical: 6,
    borderColor: COLORS.brandRed,
    borderWidth: 1,
    borderRadius: 8,
  },

  // --- Histórico ---
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textLight,
    alignSelf: 'flex-start',
    marginBottom: 15,
    marginTop: 10,
  },
  historyItem: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  historyClass: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    color: COLORS.textGray,
  },
  
  // --- Status (Base) ---
  statusBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  // --- Status Específicos ---
  statusConcluida: {
    color: COLORS.successGreen,
    backgroundColor: 'rgba(76, 175, 80, 0.1)', // Verde claro transparente
  },
  statusCancelada: {
    color: COLORS.cancelRed,
    backgroundColor: 'rgba(255, 82, 82, 0.1)', // Vermelho claro transparente
  },
});