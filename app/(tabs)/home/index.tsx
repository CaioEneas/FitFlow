/* --- app/(tabs)/home/index.tsx --- */
/* (Versão FINAL - Com a lista de aulas dinâmica) */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import SearchBar from './SearchBar'; 
import CategoryList from './CategoryList'; 
import ClassCard from './ClassCard'; 

// --- PALETA DE CORES ---
const FITFLOW_COLORS = {
  background: '#1C1C1E',
  textLight: '#FFFFFF',
};

// Criamos um Array com os dados de todas as aulas.
// (O 'id' é importante para a performance do .map())
const AULAS_MOCK_DATA = [
  {
    id: '1',
    title: 'Boxe',
    duration: '45 min',
    professor: 'João Silva',
    academia: 'Kakureco Fight',
    image: require('../../../assets/images/boxe-card.png'),
  },
  {
    id: '2',
    title: 'Pilates',
    duration: '50 min',
    professor: 'Ana Clara',
    academia: 'Studio Equilíbrio',
    image: require('../../../assets/images/pilates-card.png'),
    
  },
  {
    id: '3',
    title: 'Muay Thai',
    duration: '60 min',
    professor: 'Roadtang',
    academia: 'Gilvan Rodrigues',
    image: require('../../../assets/images/pilates-card.png'),
    
  },
  {
    id: '4',
    title: 'Yoga',
    duration: '60 min',
    professor: 'Maria Alves',
    academia: 'Estúdio Zen',
    image: require('../../../assets/images/yoga-card.png'),
  },
  {
    id: '5',
    title: 'Jiu-Jitsu',
    duration: '90 min',
    professor: 'Mestre Carlos',
    academia: 'Dojo Lótus',
    image: require('../../../assets/images/jiujitsu-card.png'),
  },
  {
    id: '6',
    title: 'Fit Dance',
    duration: '45 min',
    professor: 'Julia Mendes',
    academia: 'Dom Bosco',
    image: require('../../../assets/images/fitdance-card.png'), 
  },
  {
    id: '7',
    title: 'CrossFit',
    duration: '60 min',
    professor: 'Coach Breno',
    academia: 'CT Calango',
    image: require('../../../assets/images/crossfit-card.png'), 
  },
];


// --- Componente Principal da HomeScreen ---
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled" 
      >
        <Text style={styles.title}>Olá, Sosthenes!</Text>
        <SearchBar />
        <Text style={styles.sectionTitle}>Categorias</Text>
        <CategoryList />
        <Text style={styles.sectionTitle}>Aulas disponíveis</Text>

        {/* Usamos .map() para percorrer o AULAS_MOCK_DATA */}
        {/* e criar um <ClassCard> para cada item (aula) */}
        
        {AULAS_MOCK_DATA.map((aula) => (
          <ClassCard 
            // O 'key' é essencial para o React saber qual item é qual
            key={aula.id} 
            
            // Passamos todas as props dinamicamente
            title={aula.title}
            duration={aula.duration}
            professor={aula.professor}
            academia={aula.academia}
            image={aula.image}
          />
        ))}
      
      </ScrollView>
    </View>
  );
}

// --- Estilos da Tela Home (Permanecem os mesmos) ---
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: FITFLOW_COLORS.background, 
  },
  scrollView: { flex: 1 },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: FITFLOW_COLORS.textLight,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: FITFLOW_COLORS.textLight,
    marginBottom: 16,
    marginTop: 10,
  },
});