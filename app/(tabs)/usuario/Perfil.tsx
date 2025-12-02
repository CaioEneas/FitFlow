// React e useState: Essenciais para criar a tela e guardar dados na memória (nome, email, foto).
import React, { useState } from 'react';

// Componentes Visuais do React Native:
// View (Caixa), ScrollView (Rolagem), TouchableOpacity (Botão transparente/área clicável), Alert (Pop-up).
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';

// React Native Paper: Biblioteca de UI que fornece componentes prontos e bonitos (Avatar, Button, Text).
import { Text, Avatar, Button } from 'react-native-paper';

// AsyncStorage: Nosso "Banco de Dados" local. É aqui que lemos quem está logado.
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navegação
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 

// Expo Image Picker: Biblioteca para acessar a câmera e galeria do celular.
import * as ImagePicker from 'expo-image-picker'; 

// Estilos externos
import { styles } from './styles/PerfilStyles'; 

// Banco de Dados FALSO
const HISTORICO_MOCK = [
  { id: '1', aula: 'Boxe', data: '15/11/2025', status: 'Concluída' },
  { id: '2', aula: 'Yoga', data: '12/11/2025', status: 'Cancelada' }, 
  { id: '3', aula: 'CrossFit', data: '10/11/2025', status: 'Concluída' },
  { id: '4', aula: 'Fit Dance', data: '05/11/2025', status: 'Concluída' },
  { id: '5', aula: 'Jiu-Jitsu', data: '01/11/2025', status: 'Cancelada' }, 
];

// COMPONENTE PRINCIPAL
export default function MeuPerfilScreen() {
  
  // ESTADOS (Memória Temporária da Tela)
  const [nome, setNome] = useState('Carregando...'); // Começa com texto de carregamento
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState<string | null>(null); // Guarda o caminho da foto no celular
  
  const navigation = useNavigation<any>(); // Hook para controlar a navegação

  // EFEITO DE CARREGAMENTO 
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          // Busca a sessão atual 
          const sessionJson = await AsyncStorage.getItem('fitflow_user_session');
          
          if (sessionJson) {
            // Se achou sessão, converte de Texto para Objeto JSON
            const user = JSON.parse(sessionJson);
            
            // Preenche os estados com os dados salvos
            setNome(user.nome || 'Usuário FitFlow');
            setEmail(user.email || 'Email não disponível');
            setFoto(user.foto || null); // Se tiver foto salva, carrega. Se não, nulo.
          } else {
            // Segurança: Se por algum motivo não tiver sessão (bug ou limpeza de dados),
            // força o usuário a voltar para o Login imediatamente.
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
          }
        } catch (e) {
          console.error("Erro ao buscar dados do perfil", e);
        }
      };
      
      // Chama a função que definimos acima
      fetchUserData();
    }, []) 
  );

  // TROCAR FOTO DE PERFIL 
  const handleTrocarFoto = async () => {
    // Pede permissão para ler a galeria
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "É necessário permitir o acesso à galeria para trocar a foto.");
      return;
    }

    // Abre a galeria para o usuário escolher
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Só mostra fotos, esconde vídeos
      allowsEditing: true, // Deixa o usuário cortar a foto (crop)
      aspect: [1, 1], // Força o corte quadrado (1:1) perfeito para perfil
      quality: 0.5, // Comprime a imagem para 50% (evita deixar o app lento com fotos gigantes)
    });

    // Se o usuário escolheu uma foto (não cancelou)
    if (!pickerResult.canceled) {
      const novaFotoUri = pickerResult.assets[0].uri; // Pega o endereço da foto no celular
      setFoto(novaFotoUri); // Atualiza a tela instantaneamente

      try {
        // Agora precisamos salvar essa foto no AsyncStorage
        // para ela não sumir quando fechar o app.

        // Atualiza na SESSÃO ATUAL 
        const sessionJson = await AsyncStorage.getItem('fitflow_user_session');
        if (sessionJson) {
            let currentUser = JSON.parse(sessionJson);
            currentUser.foto = novaFotoUri; // Atualiza o campo foto
            await AsyncStorage.setItem('fitflow_user_session', JSON.stringify(currentUser));

             // Atualiza na LISTA DE TODOS OS USUÁRIOS 
             // Se não fizermos isso, no próximo login a foto antiga voltaria.
             const usersJson = await AsyncStorage.getItem('fitflow_users');
             if (usersJson) {
                let users = JSON.parse(usersJson);
                // Procura o usuário certo na lista pelo e-mail
                const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
                
                if (userIndex !== -1) {
                    users[userIndex].foto = novaFotoUri; // Atualiza o usuário na lista
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
        // Apaga a sessão do celular
        await AsyncStorage.removeItem('fitflow_user_session');
        
        // Reinicia a navegação do zero
        // 'reset' apaga o histórico de telas. O usuário não consegue apertar "Voltar"
        // para ver o perfil de novo, pois a tela de Perfil foi destruída.
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
  };

  // Função auxiliar para mudar a cor da etiqueta de status (Verde ou Vermelho)
  const getStatusStyle = (status: string) => {
    if (status === 'Concluída') return styles.statusConcluida;
    if (status === 'Cancelada') return styles.statusCancelada;
    return {};
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ÁREA DA FOTO*/}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
            {/* TouchableOpacity torna a foto clicável para editar */}
            <TouchableOpacity onPress={handleTrocarFoto} style={{ position: 'relative' }}>
                {/* Lógica Condicional: Se tem foto, mostra ela. Se não, mostra ícone padrão. */}
                {foto ? (
                    <Avatar.Image size={100} source={{ uri: foto }} style={styles.avatar} />
                ) : (
                    <Avatar.Icon size={100} icon="account" style={styles.avatar} color="#FFF" />
                )}
                
                {/* Pequeno ícone de lápis sobreposto no canto */}
                <View style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    right: 0, 
                    backgroundColor: '#E63946', // Vermelho da marca
                    borderRadius: 20, 
                    padding: 4,
                    borderWidth: 2,
                    borderColor: '#1C1C1E' // Borda escura para separar da foto
                }}>
                    <Avatar.Icon size={20} icon="pencil" color="#FFF" style={{ backgroundColor: 'transparent' }} />
                </View>
            </TouchableOpacity>
            
            <Text style={[styles.nome, { marginTop: 10 }]}>{nome}</Text>
            <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" // Botão preenchido
            onPress={() => navigation.navigate('AlterarSenha')}
            style={styles.button}
            icon="key"
            labelStyle={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}
          >
            Alterar Senha
          </Button>
          
          <Button 
            mode="outlined" // Botão só com contorno
            onPress={handleLogout}
            style={styles.buttonLogout} 
            textColor="#E63946"
            icon="logout"
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Sair
          </Button>
        </View>

        {/* HISTÓRICO DAS AULAS */}
        <Text style={styles.sectionTitle}>Histórico de Aulas</Text>

        {/* .map: Transforma cada item da lista de dados em um visual na tela */}
        {HISTORICO_MOCK.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyInfo}>
              <Text style={styles.historyClass}>{item.aula}</Text>
              <Text style={styles.historyDate}>{item.data}</Text>
            </View>
            
            {/* Status colorido dinamicamente */}
            <Text style={[styles.statusBadge, getStatusStyle(item.status)]}>
              {item.status}
            </Text>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}