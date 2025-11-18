/* Componente da lista horizontal de categorias */
import React, { useState } from 'react';
// Importamos ScrollView (para rolar) e TouchableOpacity (para o clique)
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles/CategoryListStyles';

// Dados "falsos" (mock) para as nossas categorias
// No futuro, isso pode vir de uma API
const CATEGORIAS = [
  'Boxe',
  'Pilates',
  'Muay Thai',
  'Fit Dance',
  'Crossfit',
  'Yoga'
];

export default function CategoryList() {
  // Estado para guardar qual categoria está ativa.
  // Começamos com a primeira da lista ('Boxe')
  const [activeCategory, setActiveCategory] = useState(CATEGORIAS[0]);

  return (
    // ScrollView horizontal.
    // showsHorizontalScrollIndicator={false} esconde a barrinha de rolagem.
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 16 }} // Espaço abaixo da lista
    >
      {/* Usamos .map() para transformar nosso array de strings em componentes */}
      {CATEGORIAS.map((categoria) => {
        // Verifica se a categoria deste loop é a que está ativa
        const isActive = categoria === activeCategory;

        return (
          // Usamos TouchableOpacity para criar o "botão"
          <TouchableOpacity
            key={categoria} // Chave única para cada item da lista
            // Ao clicar, atualizamos o estado 'activeCategory'
            onPress={() => setActiveCategory(categoria)}
            // Aplicamos estilos diferentes se estiver ativo ou inativo
            style={[
              styles.chip,
              isActive ? styles.chipActive : styles.chipInactive
            ]}
          >
            <Text
              style={[
                styles.chipText,
                isActive ? styles.textActive : styles.textInactive
              ]}
            >
              {categoria}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}