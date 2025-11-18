/* --- app/(tabs)/usuario/Login.tsx --- */
/* Tela de Login refatorada para o layout do Figma */
/* (Versão com caminhos de import CORRIGIDOS e comentários detalhados) */

// Importa React e os hooks 'useState' (para guardar estado) e 'useEffect' (para efeitos colaterais)
import React, { useState, useEffect } from 'react';
// Importa componentes visuais básicos do React Native
import { View, Image, Alert, ScrollView } from 'react-native';
// Importa componentes visuais estilizados da biblioteca 'react-native-paper'
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
// Importa o hook 'useNavigation' para permitir a troca de telas
import { useNavigation } from '@react-navigation/native';
// Importa o tipo 'StackNavigationProp' para dar tipagem ao nosso hook de navegação
import { StackNavigationProp } from '@react-navigation/stack';
// Importa o componente de Barra de Status
import { StatusBar } from 'expo-status-bar';
// Importa nossos estilos customizados (baseado na sua estrutura 'imagem_2025-11-16_002353254.png')
import { styles } from './styles/LoginScreenStyles'; 
// Importa nosso hook de autenticação (Padrão Singleton)
import { useAuth } from './hooks/useAuth'; 
// Importa o AsyncStorage para checar se o usuário já está logado
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa nossa função de validação (Padrão Strategy)
import { validateLoginFields } from './util/utils'; 

// Define os tipos das rotas que podemos navegar a partir desta tela
type RootStackParamList = {
  HomeTabs: undefined; // 'HomeTabs' é o nome da tela que contém nossas abas (definido no _layout.tsx)
  RegistroUser: undefined; // Tela de Registro
  RedefinirSenha: undefined; // Tela de Redefinir Senha
};

const FITFLOW_COLORS = {
  brandRed: '#E63946',
  textLight: '#FFFFFF',
  textGray: '#8A8A8E',
};

const textInputTheme = {
  colors: {
    primary: FITFLOW_COLORS.brandRed,     // Cor do FOCO
    onSurface: FITFLOW_COLORS.textLight,   // Cor do TEXTO digitado
    onSurfaceVariant: FITFLOW_COLORS.textGray, // Cor do LABEL 
    text: FITFLOW_COLORS.textLight,       // Cor do texto digitado
    placeholder: FITFLOW_COLORS.textGray, // Cor do placeholder
  }
};

// --- Componente Principal da Tela de Login ---
export default function LoginScreen() {
  // --- Estados ---
  // Cria um estado 'email' e uma função 'setEmail' para atualizá-lo
  const [email, setEmail] = useState('');
  // Cria um estado 'senha' e uma função 'setSenha' para atualizá-lo
  const [senha, setSenha] = useState('');

  // --- Hooks ---
  // Inicializa o hook de navegação com a tipagem que definimos
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // Extrai as funções e estados do nosso hook de autenticação
  const { loading, visibleSnackbar, setVisibleSnackbar, handleLogin } = useAuth();

  // --- Efeito ---
  // 'useEffect' que roda uma vez '[]' para checar se o usuário já está logado
  useEffect(() => {
    // Função interna assíncrona
    const checkUser = async () => {
      try {
        // Tenta ler o 'userType' do disco
        const userType = await AsyncStorage.getItem('userType');
        // Se existir...
        if (userType) {
          // Navega para a tela 'HomeTabs' (a tela principal do app)
          // 'replace' substitui a tela de Login, impedindo o usuário de "voltar" para ela
          navigation.replace('HomeTabs');
        }
      } catch (error) {
        // Se der erro, apenas loga no console
        console.error('Erro ao verificar usuário:', error);
      }
    };
    // Chama a função
    checkUser();
  }, []); // '[]' = "Rodar apenas uma vez"

  // --- Handlers (Manipuladores) ---
  // Função chamada ao clicar no botão "Entrar"
  const handleLoginPress = () => {
    // Valida os campos usando nossa função externa (Strategy)
    const validationMessage = validateLoginFields(email, senha);
    // Se a mensagem for diferente de 'true' (ou seja, for um erro)...
    if (validationMessage !== true) {
      // Mostra um Alerta nativo com o erro
      Alert.alert('Erro', validationMessage as string);
      // Para a execução
      return;
    }
    // Se a validação passou, chama a função 'handleLogin' do 'useAuth'
    // Passa 'HomeTabs' como o destino para onde navegar após o sucesso
    handleLogin(email, senha, navigation);
  };

  // --- Renderização (JSX) ---
  return (
    // Container principal com o fundo escuro
    <View style={styles.blackContainer}>
      {/* Barra de status com ícones brancos */}
      <StatusBar style="light" />
      {/* ScrollView para garantir que a tela role (ex: teclado) */}
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        {/* Container da Logo */}
        <View style={styles.imageWrapper}>
          {/* Imagem da Logo */}
          {/* ATENÇÃO: Atualize este caminho se o seu logo estiver em outro lugar */}
          <Image 
            source={require('../../../assets/images/logoff.png')} 
            style={styles.image} 
            resizeMode="contain" // 'contain' garante que a imagem caiba sem distorcer
          />
        </View>

        {/* Campo de Email */}
        <TextInput
          label="E-mail" // Texto do label
          value={email} // Valor (controlado pelo estado)
          onChangeText={setEmail} // Função chamada ao digitar
          style={styles.input} // Estilo do componente
          autoCapitalize="none" // Não deixar a primeira letra maiúscula
          keyboardType="email-address" // Otimiza o teclado para email
          mode="outlined" // Estilo visual (com borda)
          theme={textInputTheme}
          textColor={FITFLOW_COLORS.textLight}
        />

        {/* Campo de Senha */}
        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry // Esconde o texto da senha
          style={styles.input}
          mode="outlined"
          theme={textInputTheme}
          textColor={FITFLOW_COLORS.textLight}
        />

        {/* Botão de Login */}
        <Button
          mode="contained" // Estilo visual (sólido)
          onPress={handleLoginPress} // Função chamada ao clicar
          style={styles.button} // Nosso estilo (cor vermelha)
          contentStyle={{ paddingVertical: 8 }} // Estilo interno (aumenta a altura)
          labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }} // Estilo do texto "Entrar"
          loading={loading} // Se 'loading' for true, mostra um spinner
          disabled={loading} // Se 'loading' for true, desabilita o botão
        >
          Entrar
        </Button>

        {/* Link "Esqueci a senha" */}
        <Text 
          style={styles.linkRed} // Nosso estilo (vermelho)
          onPress={() => navigation.navigate('RedefinirSenha')} // Navega para a tela
        >
          Esqueci a senha
        </Text>

        {/* Divisor "--- ou ---" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} /> {/* Linha esquerda */}
          <Text style={styles.dividerText}>ou</Text> {/* Texto "ou" */}
          <View style={styles.dividerLine} /> {/* Linha direita */}
        </View>

        {/* Seção "Cadastre-se" */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem uma conta?</Text>
          <Text 
            style={styles.linkRedInGroup} // Mesmo estilo vermelho
            onPress={() => navigation.navigate('RegistroUser')} // Navega para o Registro
          >
            {' '}Cadastre-se
          </Text>
        </View>

        {/* Snackbar (aviso) de sucesso */}
        <Snackbar
          visible={visibleSnackbar} // Controla a visibilidade
          onDismiss={() => setVisibleSnackbar(false)} // Função ao fechar
          duration={Snackbar.DURATION_SHORT} // Duração
        >
          Login efetuado com sucesso!
        </Snackbar>
      </ScrollView>
    </View>
  );
}