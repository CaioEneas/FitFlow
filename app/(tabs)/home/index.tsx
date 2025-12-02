// useEffect: Executa ações "colaterais" (como carregar dados) quando a tela abre.
import React, { useEffect, useState } from 'react';

// ScrollView: Permite rolar a tela verticalmente (essencial para listas longas).
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { StatusBar } from 'expo-status-bar';

// AsyncStorage: Precisamos dele aqui para ler a sessão que o Login salvou.
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Componentes Customizados: Peças de Lego que criamos em outros arquivos para montar essa tela.
import SearchBar from './SearchBar'; 
import CategoryList from './CategoryList'; 
import ClassCard from './ClassCard'; 

// --- CONFIGURAÇÃO VISUAL ---
const FITFLOW_COLORS = {
  background: '#1C1C1E',
  textLight: '#FFFFFF',
};

// --- BANCO DE DADOS FALSO (Mock Data) ---
// Não tem bakc-end ainda, então foi criada uma lista fixa (Array).
const AULAS_MOCK_DATA = [
  {
    id: '1', // ID único é vital para o React não se perder na lista
    title: 'Boxe',
    duration: '60 min',
    professor: 'João Silva',
    academia: 'Kakureco Fight',
    // require: O jeito do React Native carregar imagens que estão dentro do projeto
    image: require('../../../assets/images/boxe-card.png'),
  },
  {
    id: '2',
    title: 'Pilates',
    duration: '60 min',
    professor: 'Ana Clara',
    academia: 'Estúdio Equilíbrio',
    image: require('../../../assets/images/pilates-card.png'),
  },
  {
    id: '3',
    title: 'Muay Thai',
    duration: '60 min',
    professor: 'Roadtang',
    academia: 'Gilvan Rodrigues',
    image: require('../../../assets/images/muaythai-card.png'),
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
    duration: '60 min',
    professor: 'Mestre Carlos',
    academia: 'Kakureko Fight',
    image: require('../../../assets/images/jiujitsu-card.png'),
  },
  {
    id: '6',
    title: 'Fit Dance',
    duration: '60 min',
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

// --- COMPONENTE PRINCIPAL ---
export default function HomeScreen() {
  
  const [nomeUsuario, setNomeUsuario] = useState('Visitante');

  // A lista vazia [] no final diz: "Execute isso apenas UMA vez, quando a tela nascer".
  useEffect(() => {
    
    // Função assíncrona para buscar dados no armazenamento do celular
    const loadUserName = async () => {
      try {
        // LEITURA: Busca a "folha" onde anotamos a sessão no Login.tsx
        const sessionJson = await AsyncStorage.getItem('fitflow_user_session');
        
        // Se a folha não estiver em branco...
        if (sessionJson) {
          // TRADUÇÃO: Converte texto JSON de volta para Objeto Javascript
          const user = JSON.parse(sessionJson);
          
          // LÓGICA DE APRESENTAÇÃO:
          // Pega um nome divide pelos espaços (' ') e pega a primeira parte [0].
          const primeiroNome = user.nome.split(' ')[0];
          
          // ATUALIZAÇÃO: Salva na memória do estado, o que faz a tela redesenhar.
          setNomeUsuario(primeiroNome);
        }
      } catch (error) {
        console.log('Erro ao carregar usuário na Home:', error);
      }
    };

    // Chama a função que acabamos de definir acima
    loadUserName();
  }, []);

  // 4. INTERFACE 
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled" 
      >
        {/* Título Dinâmico: Aqui usamos a variável do estado */}
        <Text style={styles.title}>Olá, {nomeUsuario}!</Text>
        
        {/* Componentes visuais importados */}
        <SearchBar />
        
        <Text style={styles.sectionTitle}>Categorias</Text>
        <CategoryList />
        
        <Text style={styles.sectionTitle}>Aulas disponíveis</Text>

        {/* O .map percorre o array 'AULAS_MOCK_DATA'. */}
        {/* Para cada item ('aula'), ele desenha um <ClassCard /> */}
        {AULAS_MOCK_DATA.map((aula) => (
          <ClassCard 
            // key: Obrigatório em listas. Ajuda o React a saber qual item atualizar se algo mudar.
            key={aula.id} 
            
            // Dados do objeto 'aula' para dentro do componente visual 'ClassCard'
            title={aula.title}
            duration={aula.duration}
            professor={aula.professor}
            academia={aula.academia}
            image={aula.image}
          />
        ))}
        {/* Fim do .map */}
      
      </ScrollView>
    </View>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: FITFLOW_COLORS.background, 
  },
  scrollView: { flex: 1 },
  contentContainer: {
    paddingHorizontal: 20, // Espaçamento nas laterais (esquerda/direita)
    paddingTop: 16,
    paddingBottom: 80, // Espaço extra no final para a TabBar (menu inferior) não tapar o último card
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: FITFLOW_COLORS.textLight,
    marginBottom: 20,
    marginTop: 20, 
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: FITFLOW_COLORS.textLight,
    marginBottom: 16,
    marginTop: 10,
  },
});