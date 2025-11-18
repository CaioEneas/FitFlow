/* --- app/(tabs)/CustomDrawerContent.tsx --- */
/* (Conteúdo do Menu Lateral com o Tema Escuro) */

import React, { useEffect, useState } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Modal,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDrawerStatus } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

// Paleta de cores do FitFlow
const COLORS = {
  background: '#1C1C1E', // Fundo principal do drawer
  surface: '#1C1C1E',    // Cor de "superfície" (para o header)
  textLight: '#FFFFFF',  // Texto branco
  textGray: '#8A8A8E',   // Texto cinza (para email, tipo, id)
  brandRed: '#E63946',   // Vermelho (para o "não logado")
  inputBg: '#3A3A3C',    // Fundo do input no modal
};

// Interface para os dados do usuário
interface UserData {
  email: string;
  userType: string;
  photo?: string;
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  // Estados para guardar os dados do usuário
  const [user, setUser] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  // Estados de UI (Modal, Loading)
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeEditado, setNomeEditado] = useState('');
  const [loading, setLoading] = useState(false); 

  // Animação para o texto "Usuário não logado"
  const isDrawerOpen = useDrawerStatus();
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Carrega os dados do usuário do AsyncStorage quando o menu é aberto
  useEffect(() => {
    if (isDrawerOpen === 'open') {
      (async () => {
        try {
          const [email, userType, photo, id, nomeCompleto] = await Promise.all([
            AsyncStorage.getItem('userEmail'),
            AsyncStorage.getItem('userType'),
            AsyncStorage.getItem('userPhoto'),
            AsyncStorage.getItem('userId'),
            AsyncStorage.getItem('nome'),
          ]);

          if (email && userType) {
            setUser({ email, userType, photo: photo || undefined });
          } else {
            setUser(null);
          }

          setUserId(id);
          const nomeValido = nomeCompleto?.trim();
          setNome(nomeValido && nomeValido !== '' ? nomeValido : null);
        } catch (e) {
          console.error('Erro ao carregar dados do usuário:', e);
        }
      })();
    }
  }, [isDrawerOpen]);

  // Controla a animação de fade-in do texto "não logado"
  useEffect(() => {
    if (!user) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [user]);

  // Salva o nome editado no AsyncStorage e atualiza o estado
  const handleSalvarEdicao = async () => {
    try {
      await AsyncStorage.setItem('nome', nomeEditado);
      setNome(nomeEditado);
      setModalVisible(false);
    } catch (e) {
      console.error('Erro ao salvar nome:', e);
    }
  };

  return (
    // Define a cor de fundo principal para todo o conteúdo do menu
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Container do Cabeçalho (Header) */}
      <View style={styles.header}>
        {user && (
          <IconButton
            icon="pencil"
            size={22}
            onPress={() => setModalVisible(true)}
            style={styles.topLeftIcon}
            accessibilityLabel="Editar nome"
            iconColor={COLORS.textLight} // Define a cor do ícone de lápis
          />
        )}

        {/* Verifica se o usuário está logado */}
        {user ? (
          // Se estiver logado, mostra as infos
          <>
            <View style={{ position: 'relative' }}>
              {loading && (
                <ActivityIndicator
                  size="small"
                  color={COLORS.textLight} // Cor do spinner de loading
                  style={styles.loader}
                />
              )}
              <Image
                source={
                  user.photo
                    ? { uri: user.photo }
                    : require('../../assets/images/user-placeholder.png')
                }
                style={[styles.avatar, loading && { opacity: 0.3 }]}
                resizeMode="cover"
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
              />
            </View>
            <Text style={styles.name}>{nome ? nome : 'Nome não disponível'}</Text>
            <Text style={styles.info}>E-mail: {user.email}</Text>
            <Text style={styles.info}>Tipo: {user.userType === '0' ? 'Admin' : 'Cliente'}</Text>
            <Text style={styles.info}>ID: {userId ?? 'N/D'}</Text>
          </>
        ) : (
          // Se não estiver logado, mostra a mensagem
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.loggedOutText}>❌ Usuário não logado</Text>
          </Animated.View>
        )}
      </View>

      {/* Container para os itens de navegação (Login, Sair, etc.) */}
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Modal para Editar o Nome */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}> 
              Editar Nome
            </Text>
            <TextInput
              value={nomeEditado}
              onChangeText={setNomeEditado}
              placeholder="Digite o novo nome"
              placeholderTextColor={COLORS.textGray} // Cor do placeholder
              style={styles.input}
            />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <Button title="Salvar" onPress={handleSalvarEdicao} color={COLORS.brandRed} />
  _             <Button
                title="Cancelar"
                color={COLORS.textGray}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

// Estilos da tela
const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: COLORS.surface, // Cor de "superfície" cinza escura
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background, // Borda sutil
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    backgroundColor: COLORS.background, // Fundo do placeholder do avatar
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textLight, // Cor branca
  },
  info: {
    fontSize: 14,
    color: COLORS.textGray, // Cor cinza
    marginTop: 2,
  },
  loggedOutText: {
    fontSize: 16,
    color: COLORS.brandRed, // Cor vermelha (brilhante)
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Fundo mais escuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: COLORS.surface, // Fundo cinza escuro
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.textGray,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    color: COLORS.textLight, // Cor do texto digitado
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 0,
    margin: 0,
  },
  loader: {
    position: 'absolute',
    top: '30%',
    left: '40%',
    zIndex: 10,
  },
});