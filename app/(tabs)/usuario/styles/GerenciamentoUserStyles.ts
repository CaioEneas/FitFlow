// src/screens/GerenciamentoUser/styles.ts

import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#D2B48C',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  tableHeader: {
    backgroundColor: '#A67B5B',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  dataTable: {
    width: '100%',
    minWidth: undefined, // Removido para não estourar o modal
    flexShrink: 1,
  },
  verticalScroll: {
    maxHeight: 250, // Reduzido para caber melhor no modal
  },
  scrollContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
  },
 modal: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  width: '80%',
  maxHeight: '100%',
  alignSelf: 'center',
},
  modalHeader: {
    backgroundColor: '#D2B48C',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContent: {
    marginBottom: 4,
    flexShrink: 1,
  },
  gridContainer: {
    flexDirection: 'column',
    marginBottom: 4,
  },
  gridItem: {
    marginBottom: 4,
  },
  modalText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  modalFooter: {
    backgroundColor: '#D2B48C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 6,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 6,
  },
  columnHeader: {
    width: 180,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnCell: {
    width: 180,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderText: {
    color: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  agendamentoButton: {
    backgroundColor: '#A67B5B',
  },
  searchInput: {
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
    elevation: 2,
    fontSize: 12,
  },
  searchInputFocused: {
    borderColor: '#A67B5B',
    backgroundColor: '#f9f9f9',
  },
  counterText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'white',
  },
  titleContainer: {
    backgroundColor: '#C19A6B',
    borderWidth: 1,
    borderColor: '#A67B5B',
    borderRadius: 2,
    padding: 5,
    marginBottom: 6,
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  zebraRowEven: {
    backgroundColor: '#f9f1e7',
  },
  zebraRowOdd: {
    backgroundColor: '#fffaf3',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  placeholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
