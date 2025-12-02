/* --- app/(tabs)/CustomDrawerContent.tsx --- */
import React, { useEffect, useState } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton, Avatar } from 'react-native-paper'; // Usando Avatar para consistência

// Paleta de cores do FitFlow
const COLORS = {
  background: '#1C1C1E',
  surface: '#2C2C2E',    
  textLight: '#FFFFFF', 
  textGray: '#8A8A8E', 
  brandRed: '#E63946', 
  inputBg: '#3A3A3C', 
};

// Interface para os dados do usuário (Baseado no objeto salvo no Login/Perfil)
interface UserData {
  nome: string;
  email: string;
  foto?: string; // Opcional
  userType?: string;
  id?: string;
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  // Estados
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false); 

  // Estados de Edição de Nome
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeEditado, setNomeEditado] = useState('');

  // Verifica se o menu está aberto (para recarregar os dados)
  const isDrawerOpen = useDrawerStatus();
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Roda toda vez que o menu abre ('open')
  useEffect(() => {
    if (isDrawerOpen === 'open') {
      const loadSession = async () => {
        try {
          // Busca o objeto UNIFICADO da sessão
          const sessionJson = await AsyncStorage.getItem('fitflow_user_session');
          
          if (sessionJson) {
            const userData = JSON.parse(sessionJson);
            setUser(userData);
            setNomeEditado(userData.nome || '');
          } else {
            setUser(null);
          }
        } catch (e) {
          console.error('Erro ao carregar sessão no drawer:', e);
          setUser(null);
        }
      };
      loadSession();
    }
  }, [isDrawerOpen]);

  // Animação do texto "não logado"
  useEffect(() => {
    if (!user) {
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [user]);

  // SALVAR EDIÇÃO DE NOME NO DRAWER 
  const handleSalvarEdicao = async () => {
    if (!user) return;

    try {
      // Atualiza o estado local
      const newUser = { ...user, nome: nomeEditado };
      setUser(newUser);

      // Atualiza na SESSÃO (para manter na memória agora)
      await AsyncStorage.setItem('fitflow_user_session', JSON.stringify(newUser));

      // Atualiza no "BANCO GERAL" (para manter no próximo login)
      const usersJson = await AsyncStorage.getItem('fitflow_users');
      if (usersJson) {
        let users = JSON.parse(usersJson);
        const userIndex = users.findIndex((u: any) => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex].nome = nomeEditado;
            await AsyncStorage.setItem('fitflow_users', JSON.stringify(users));
        }
      }

      setModalVisible(false);
    } catch (e) {
      console.error('Erro ao salvar nome:', e);
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.header}>
        
        {/* Botão de Editar Nome (Só aparece se logado) */}
        {user && (
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => setModalVisible(true)}
            style={styles.topLeftIcon}
            iconColor={COLORS.textLight} 
          />
        )}

        {/*  ÁREA DO USUÁRIO */}
        {user ? (
          <>
            <View style={{ marginBottom: 10 }}>
              {user.foto ? (
                // Se tiver foto, mostra ela
                <Avatar.Image 
                    size={80} 
                    source={{ uri: user.foto }} 
                    style={{ backgroundColor: COLORS.surface }}
                />
              ) : (
                // Se não tiver, mostra ícone padrão
                <Avatar.Icon 
                    size={80} 
                    icon="account" 
                    color={COLORS.textLight}
                    style={{ backgroundColor: COLORS.surface }}
                />
              )}
            </View>
            
            <Text style={styles.name}>{user.nome || 'Usuário FitFlow'}</Text>
            <Text style={styles.info}>{user.email}</Text>
          </>
        ) : (
          // Se não estiver logado
          <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
            <Avatar.Icon size={80} icon="account-off" style={{ backgroundColor: COLORS.surface, marginBottom: 10 }} />
            <Text style={styles.loggedOutText}>Visitante</Text>
            <Text style={styles.info}>Faça login para ver seu perfil</Text>
          </Animated.View>
        )}
      </View>

      {/* LISTA DE NAVEGAÇÃO */}
      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>

      {/* --- MODAL DE EDITAR NOME --- */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Nome</Text>
            
            <TextInput
              value={nomeEditado}
              onChangeText={setNomeEditado}
              placeholder="Seu nome"
              placeholderTextColor={COLORS.textGray}
              style={styles.input}
              autoFocus
            />
            
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <Button title="Cancelar" color={COLORS.textGray} onPress={() => setModalVisible(false)} />
              <Button title="Salvar" color={COLORS.brandRed} onPress={handleSalvarEdicao} />
            </View>
          </View>
        </View>
      </Modal>

    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

// --- ESTILOS ---
const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#252527', // Um pouco mais claro que o fundo
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    minHeight: 200, // Altura fixa para ficar bonito
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginTop: 5,
    textAlign: 'center',
  },
  info: {
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 2,
    textAlign: 'center',
  },
  loggedOutText: {
    fontSize: 18,
    color: COLORS.brandRed,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  modalTitle: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    padding: 12,
    color: COLORS.textLight,
    fontSize: 16,
  },
  topLeftIcon: {
    position: 'absolute',
    top: 10,
    right: 10, // Mudei para direita para não atrapalhar o botão de fechar do drawer
    zIndex: 10,
    margin: 0,
  },
});