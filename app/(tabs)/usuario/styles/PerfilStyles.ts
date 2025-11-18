/* --- app/(tabs)/usuario/styles/PerfilStyles.ts --- */
/* Estilos para o Painel de Admin (GerenciamentoUser) com tema FitFlow */

// Importa o StyleSheet para criar a folha de estilos
import { StyleSheet } from 'react-native';

// --- PALETA DE CORES FITFLOW (Admin) ---
// Define as cores que vamos usar nesta tela
const COLORS = {
  background: '#1C1C1E', // Fundo escuro
  surface: '#2C2C2E',    // Fundo de "superfícies" (cards, modais, tabelas)
  brandRed: '#E63946',   // Vermelho oficial da marca
  textLight: '#FFFFFF',  // Texto principal (branco)
  textGray: '#8A8A8E',   // Texto secundário (cinza)
  inputBackground: '#2C2C2E', // Fundo dos campos de texto
};

// Exporta os estilos para serem usados no Perfil.tsx
export const styles = StyleSheet.create({
  // --- Container Principal ---
  container: {
    flex: 1, // Faz a tela ocupar todo o espaço
    backgroundColor: COLORS.background, // Define o fundo escuro
    padding: 16, // Espaçamento interno
  },
  
  // --- Barra de Pesquisa ---
  searchInput: {
    marginVertical: 16, // Espaço em cima e embaixo
    backgroundColor: COLORS.inputBackground, // Fundo do input
  },

  // --- Título da Tabela ---
  titleContainer: {
    alignItems: 'center', // Centraliza o título
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textLight, // Cor branca
    marginVertical: 10,
  },

  // --- Tabela (DataTable) ---
  // Container do Scroll Horizontal
  scrollContainer: {
    flex: 1, // Permite que a tabela ocupe o espaço restante
    marginBottom: 10,
  },
  // Container do Scroll Vertical
  verticalScroll: {
    flex: 1,
  },
  // Estilo da Tabela em si
  dataTable: {
    backgroundColor: COLORS.surface, // Fundo cinza escuro
    borderRadius: 8, // Bordas arredondadas
  },
  // Cabeçalho da Tabela
  tableHeader: {
    backgroundColor: '#3A3A3C', // Um cinza um pouco mais escuro para o header
    borderTopLeftRadius: 8, // Arredonda canto superior esquerdo
    borderTopRightRadius: 8, // Arredonda canto superior direito
  },
  // Célula do Cabeçalho
  columnHeader: {
    flex: 1, // Faz as colunas terem largura igual
  },
  // Texto do Cabeçalho
  columnHeaderText: {
    color: COLORS.textLight,
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Linha Par (Efeito Zebrado)
  zebraRowEven: {
    backgroundColor: COLORS.surface,
  },
  // Linha Ímpar (Efeito Zebrado)
  zebraRowOdd: {
    backgroundColor: '#3A3A3C', // Cor alternada
  },
  // Célula comum da Tabela
  columnCell: {
    flex: 1,
  },
  // Estilo para o TEXTO dentro da célula
  cellText: {
    color: COLORS.textLight, // Cor branca
  },

  // --- Contador de Usuários ---
  counterText: {
    color: COLORS.textGray, // Cor cinza
    textAlign: 'center',
    marginVertical: 10,
  },

  // --- Estilos do Modal ---
  // Estilo do container do Modal (do React Native Paper)
  modal: {
    backgroundColor: COLORS.surface, // Fundo cinza escuro
    marginHorizontal: 20, // Margens laterais
    borderRadius: 10, // Bordas arredondadas
    padding: 20, // Espaçamento interno
  },
  // (Este estilo não é mais necessário, o Paper cuida disso)
  modalContent: {
  },
  // Cabeçalho do Modal
  modalHeader: {
    borderBottomWidth: 1, // Linha divisória
    borderBottomColor: COLORS.textGray,
    paddingBottom: 10,
    marginBottom: 20,
  },
  // Título do Modal
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textLight,
    textAlign: 'center',
  },
  
  // --- Grid de Inputs (dentro do Modal) ---
  gridContainer: {
    // (O código já usa flex, então só precisamos de espaçamento)
  },
  gridItem: {
    backgroundColor: COLORS.inputBackground, // Fundo do input
    marginBottom: 16, // Espaço entre os inputs
  },

  // --- Seletor de Imagem ---
  imageContainer: {
    alignItems: 'center', // Centraliza
    marginVertical: 20,
  },
  // Imagem de perfil selecionada
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Círculo perfeito
  },
  // "Caixa" da imagem de placeholder
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.background, // Fundo mais escuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Ícone de placeholder (usuário)
  placeholderImage: {
    width: 60,
    height: 60,
    tintColor: COLORS.textGray, // Colore o ícone de cinza
  },
  
  // --- Botões do Modal (Rodapé) ---
  modalFooter: {
    flexDirection: 'row', // Alinha botões na horizontal
    justifyContent: 'flex-end', // Alinha à direita
    marginTop: 20,
  },
  // Botão principal (Adicionar/Atualizar)
  agendamentoButton: {
    backgroundColor: COLORS.brandRed, // Cor vermelha
  },

  // --- Logo (REMOVER) ---
  image: {
    display: 'none', // Esconde a imagem do "Elysium"
  },
});