/* --- app/(tabs)/agendamento/styles/MeusAgendamentosStyles.ts --- */
/* Estilos para a tela "Meus Agendamentos" */

import { StyleSheet } from 'react-native';

// Paleta de cores do FitFlow
const COLORS = {
  background: '#1C1C1E', // Fundo escuro
  surface: '#2C2C2E',    // Fundo do card
  brandRed: '#E63946',   // Vermelho (destaque)
  textLight: '#FFFFFF',  // Branco
  textGray: '#8A8A8E',   // Cinza
};

export const styles = StyleSheet.create({
  // --- Tela ---
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 20,
  },

  // --- Card de Agendamento ---
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    flexDirection: 'row', // Alinha a data ao lado das infos
    alignItems: 'center',
  },
  
  // Caixa da Data (Esquerda)
  dateBox: {
    width: 60,
    height: 65,
    backgroundColor: '#3A3A3C', // Um pouco mais claro que o card
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  dateMonth: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.brandRed, // Mês em vermelho (ex: NOV)
    textTransform: 'uppercase',
  },
  dateDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textLight, // Dia em branco (ex: 20)
  },

  // Container das Informações (Centro)
  infoContainer: {
    flex: 1, // Ocupa todo o espaço restante
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textGray,
    marginBottom: 2,
  },

  // Botão Cancelar
  cancelButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.brandRed, // Borda vermelha
    borderRadius: 6,
    paddingVertical: 4,
    alignItems: 'center',
    width: 100,
  },
  cancelButtonText: {
    color: COLORS.brandRed,
    fontWeight: 'bold',
    fontSize: 12,
  },

  // --- Mensagem de "Vazio" ---
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, // Empurra para baixo se a lista estiver vazia
    opacity: 0.5,
  },
  emptyStateText: {
    color: COLORS.textGray,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});