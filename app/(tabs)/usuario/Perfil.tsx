import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Avatar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import * as ImagePicker from 'expo-image-picker'; 
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/PerfilStyles'; 

// BANCO DE DADOS FALSO

// Histórico de Treinos
const HISTORICO_MOCK = [
  { id: '1', aula: 'Boxe', data: '15/11/2025', status: 'Concluída' },
  { id: '2', aula: 'Yoga', data: '12/11/2025', status: 'Cancelada' }, 
  { id: '3', aula: 'CrossFit', data: '10/11/2025', status: 'Concluída' },
  { id: '4', aula: 'Fit Dance', data: '05/11/2025', status: 'Concluída' },
  { id: '5', aula: 'Jiu-Jitsu', data: '01/11/2025', status: 'Cancelada' }, 
];

// Histórico de Pagamentos
// Pix e Cartão misturados, mas o código vai saber qual ícone mostrar.
const PAGAMENTOS_MOCK = [
  { id: '101', metodo: 'Cartão de Crédito', valor: 'R$ 120,00', data: '10/11/2025', icon: 'card-outline' },
  { id: '102', metodo: 'Pix', valor: 'R$ 100,00', data: '10/10/2025', icon: 'flash-outline' }, // Ícone de raio
  { id: '103', metodo: 'Cartão de Crédito', valor: 'R$ 120,00', data: '10/09/2025', icon: 'card-outline' },
];

export default function MeuPerfilScreen() {
  
  // 1. MEMÓRIA DA TELA (Estados)
  const [nome, setNome] = useState('Carregando...'); // Texto provisório
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState<string | null>(null); // Guarda o caminho da foto
  
  const navigation = useNavigation<any>(); 

  // 2. CARREGAMENTO DE DADOS (Ao abrir a tela)
  // O useFocusEffect roda sempre que você entra nesta tela.
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          // Pergunta ao celular: "Quem está logado?" (busca a sessão)
          const sessionJson = await AsyncStorage.getItem('fitflow_user_session');
          
          if (sessionJson) {
            const user = JSON.parse(sessionJson);
            
            // Preenche a tela com os dados encontrados
            setNome(user.nome || 'Usuário FitFlow');
            setEmail(user.email || 'Email não disponível');
            setFoto(user.foto || null);
          } else {
            // Se não tiver ninguém logado (erro), manda para o Login
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
          }
        } catch (e) {
          console.error("Erro ao buscar dados do perfil", e);
        }
      };
      
      fetchUserData();
    }, []) 
  );

  // 3. FUNÇÃO: TROCAR FOTO
  const handleTrocarFoto = async () => {
    // Pede permissão para acessar a galeria
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "É necessário permitir o acesso à galeria para trocar a foto.");
      return;
    }

    // Abre a galeria para o usuário escolher
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Só fotos
      allowsEditing: true, // Deixa cortar
      aspect: [1, 1], // Quadrado perfeito (bom para perfil)
      quality: 0.5, // Qualidade média (para não pesar)
    });

    // Se escolheu uma foto (não cancelou)
    if (!pickerResult.canceled) {
      const novaFotoUri = pickerResult.assets[0].uri;
      setFoto(novaFotoUri); // Mostra na tela imediatamente

      try {
        // Agora salva no "banco de dados" para não sumir ao fechar o app
        const sessionJson = await AsyncStorage.getItem('fitflow_user_session');
        if (sessionJson) {
            let currentUser = JSON.parse(sessionJson);
            currentUser.foto = novaFotoUri; 
            
            // A) Salva na sessão ativa (login atual)
            await AsyncStorage.setItem('fitflow_user_session', JSON.stringify(currentUser));

             // B) Salva na lista geral de usuários (para o próximo login)
             const usersJson = await AsyncStorage.getItem('fitflow_users');
             if (usersJson) {
                let users = JSON.parse(usersJson);
                // Procura o usuário certo pelo email
                const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
                
                if (userIndex !== -1) {
                    users[userIndex].foto = novaFotoUri; 
                    await AsyncStorage.setItem('fitflow_users', JSON.stringify(users));
                }
             }
        }
      } catch (e) {
        Alert.alert("Erro", "Não foi possível salvar a foto permanentemente.");
      }
    }
  };

  // SAIR
  const handleLogout = async () => {
    try {
        // Apaga o "crachá" de sessão
        await AsyncStorage.removeItem('fitflow_user_session');
        
        // Manda para o Login e limpa o histórico (não deixa voltar)
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
  };

  // Função auxiliar para pintar o status de verde ou vermelho
  const getStatusStyle = (status: string) => {
    if (status === 'Concluída') return styles.statusConcluida;
    if (status === 'Cancelada') return styles.statusCancelada;
    return {};
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* FOTO E NOME */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
            {/* O TouchableOpacity torna a foto clicável */}
            <TouchableOpacity onPress={handleTrocarFoto} style={{ position: 'relative' }}>
                {/* Mostra a foto se tiver, senão mostra um ícone padrão */}
                {foto ? (
                    <Avatar.Image size={100} source={{ uri: foto }} style={styles.avatar} />
                ) : (
                    <Avatar.Icon size={100} icon="account" style={styles.avatar} color="#FFF" />
                )}
                
                {/* Ícone de lápis vermelho no canto */}
                <View style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    right: 0, 
                    backgroundColor: '#E63946', 
                    borderRadius: 20, 
                    padding: 4,
                    borderWidth: 2,
                    borderColor: '#1C1C1E' 
                }}>
                    <Avatar.Icon size={20} icon="pencil" color="#FFF" style={{ backgroundColor: 'transparent' }} />
                </View>
            </TouchableOpacity>
            
            <Text style={[styles.nome, { marginTop: 10 }]}>{nome}</Text>
            <Text style={styles.email}>{email}</Text>
        </View>

        {/* --- BOTÕES DE AÇÃO --- */}
        <View style={styles.buttonContainer}>
          
          {/* Botão para escolher plano (Verde) */}
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('SelecaoPlano')} 
            style={[styles.button, { backgroundColor: '#27ae60', marginBottom: 10 }]} 
            icon="credit-card"
            labelStyle={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}
          >
            Gerenciar Plano e Pagamento
          </Button>

          {/* Botão para mudar senha */}
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('AlterarSenha')}
            style={styles.button}
            icon="key"
            labelStyle={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}
          >
            Alterar Senha
          </Button>
          
          {/* Botão Sair */}
          <Button 
            mode="outlined" 
            onPress={handleLogout}
            style={styles.buttonLogout} 
            textColor="#E63946"
            icon="logout"
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Sair
          </Button>
        </View>

        {/* --- LISTA DE TREINOS --- */}
        <Text style={styles.sectionTitle}>Histórico de Aulas</Text>

        {/* O .map desenha um item para cada aula na lista */}
        {HISTORICO_MOCK.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyInfo}>
              <Text style={styles.historyClass}>{item.aula}</Text>
              <Text style={styles.historyDate}>{item.data}</Text>
            </View>
            <Text style={[styles.statusBadge, getStatusStyle(item.status)]}>
              {item.status}
            </Text>
          </View>
        ))}

        {/* --- LISTA DE PAGAMENTOS --- */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Meus Pagamentos</Text>
        
        {/* O .map desenha um item para cada pagamento na lista */}
        {PAGAMENTOS_MOCK.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            
            {/* Ícone dinâmico: Muda se for 'card' ou 'flash' (Pix) */}
            <View style={{ 
                backgroundColor: '#2C2C2E', 
                padding: 10, 
                borderRadius: 10, 
                marginRight: 15 
            }}>
                <Ionicons name={item.icon as any} size={24} color="#E63946" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.historyClass}>{item.metodo}</Text>
              <Text style={styles.historyDate}>{item.data}</Text>
            </View>
            
            {/* Valor em verde */}
            <Text style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: 16 }}>
              {item.valor}
            </Text>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}