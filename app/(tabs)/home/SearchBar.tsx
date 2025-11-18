/* Este é o nosso componente reutilizável da Barra de Busca */
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa os ícones
import { styles } from './styles/SearchBarStyles'; // Importa nossos estilos

// Paleta (apenas para a cor do ícone e placeholder)
const COLORS = {
  textGray: '#8A8A8E',
};

export default function SearchBar() {
  // Estado para guardar o que o usuário está digitando
  const [searchQuery, setSearchQuery] = useState('');

  return (
    // Container principal (a caixa cinza escura)
    <View style={styles.container}>
      
      {/* Ícone da Lupa */}
      <Ionicons 
        name="search" 
        size={20} 
        color={COLORS.textGray} 
        style={styles.icon} 
      />
      
      {/* Campo de Texto (Input) */}
      <TextInput
        style={styles.input}
        placeholder="Buscar por aulas, academias..." // Texto do placeholder
        placeholderTextColor={COLORS.textGray} // Cor do placeholder
        value={searchQuery} // O valor é controlado pelo nosso estado
        onChangeText={setSearchQuery} // Atualiza o estado ao digitar
      />
    </View>
  );
}