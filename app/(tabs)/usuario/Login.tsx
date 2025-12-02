import React, { useState, useEffect } from 'react';
import { View, Image, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// AsyncStorage: O nosso banco de dados no celular.
// Usamos para ler os usuários cadastrados e salvar quem está logado agora.
import AsyncStorage from '@react-native-async-storage/async-storage';

// Estilos visuais (cores, margens, etc) que ficam em outro arquivo
import { styles } from './styles/LoginScreenStyles'; 

// Cores padrão do aplicativo
const FITFLOW_COLORS = {
  brandRed: '#E63946',
  textLight: '#FFFFFF',
  textGray: '#8A8A8E',
};

// Configuração visual dos campos de texto (input)
const textInputTheme = {
  colors: {
    primary: FITFLOW_COLORS.brandRed, // Cor da borda ao clicar
    onSurface: FITFLOW_COLORS.textLight, // Cor do texto digitado
    onSurfaceVariant: FITFLOW_COLORS.textGray, // Cor do texto de dica (placeholder)
    text: FITFLOW_COLORS.textLight,
    placeholder: FITFLOW_COLORS.textGray,
  }
};

export default function LoginScreen() {
  // --- MEMÓRIA DA TELA (Estados) ---
  const [email, setEmail] = useState(''); // Guarda o e-mail digitado
  const [senha, setSenha] = useState(''); // Guarda a senha digitada
  const [loading, setLoading] = useState(false); // Controla o ícone de carregamento no botão
  const [visibleSnackbar, setVisibleSnackbar] = useState(false); // Controla a mensagem de sucesso no rodapé

  // Hook de navegação: Ferramenta para mudar de tela
  const navigation = useNavigation<any>();

  // --- FUNÇÃO DE NAVEGAÇÃO SEGURA ---
  // Esta função manda o usuário para a área principal (HomeTabs).
  // Usamos 'reset' em vez de 'navigate' para limpar o histórico.
  // Isso impede que o usuário aperte o botão "Voltar" do celular e caia no login de novo.
  const navigateToHome = () => {
    console.log("Tentando navegar para HomeTabs..."); 
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeTabs' }], // Manda para o menu principal definido no _layout.tsx
    });
  };

  // --- AUTO-LOGIN (Verificação Inicial) ---
  // O useEffect roda sozinho assim que a tela abre.
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Pergunta para o celular: "Tem alguém logado?" (chave 'fitflow_user_session')
        const userSession = await AsyncStorage.getItem('fitflow_user_session');
        
        // Se tiver (não for nulo), manda direto para a Home sem pedir senha.
        if (userSession) {
          navigateToHome();
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
      }
    };
    // Chama a função que criamos acima
    checkUserSession();
  }, []);

  // --- QUANDO CLICA NO BOTÃO "ENTRAR" ---
  const handleLoginPress = async () => {
    // 1. Verifica se os campos estão vazios
    if (!email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha e-mail e senha.');
      return; // Para a execução aqui se estiver vazio
    }

    // Liga o "carregando" (spinner)
    setLoading(true);

    try {
      // 2. Busca a lista de TODOS os usuários cadastrados no celular
      const usersJson = await AsyncStorage.getItem('fitflow_users');
      
      let users = [];
      // Se a lista existir, converte de texto para objeto (JSON)
      if (usersJson) {
        users = JSON.parse(usersJson);
      }

      // 3. Procura na lista se existe alguém com esse e-mail E essa senha
      const userFound = users.find((u: any) => 
        u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
      );

      if (userFound) {
        // --- SUCESSO: LOGIN APROVADO ---
        
        // Salva os dados desse usuário na "Sessão Atual".
        // É isso que mantém o usuário logado se ele fechar o app.
        await AsyncStorage.setItem('fitflow_user_session', JSON.stringify(userFound));
        
        // Mostra a mensagem verde de sucesso
        setVisibleSnackbar(true);
        
        // Espera 1 segundo (para o usuário ler a mensagem) e muda de tela
        setTimeout(() => {
          setLoading(false);
          navigateToHome(); // Chama nossa função de navegação
        }, 1000);

      } else {
        // --- FALHA: DADOS INCORRETOS ---
        setLoading(false); // Desliga o carregando
        Alert.alert('Erro de Acesso', 'E-mail ou senha incorretos. Tente novamente.');
      }

    } catch (error) {
      // Se der algum erro técnico (memória cheia, erro de leitura)
      setLoading(false);
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
  };

  // --- A PARTE VISUAL (O que aparece na tela) ---
  return (
    <View style={styles.blackContainer}>
      <StatusBar style="light" />
      {/* ScrollView permite rolar a tela se o teclado cobrir os campos */}
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        {/* Logotipo */}
        <View style={styles.imageWrapper}>
          <Image 
            source={require('../../../assets/images/logoff.png')} 
            style={styles.image} 
            resizeMode="contain"
          />
        </View>

        {/* Campo de E-mail */}
        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail} // Atualiza o estado 'email' quando digita
          style={styles.input}
          autoCapitalize="none" // Importante: não deixa a primeira letra maiúscula
          keyboardType="email-address" // Teclado com @
          mode="outlined"
          theme={textInputTheme}
          textColor={FITFLOW_COLORS.textLight}
        />

        {/* Campo de Senha */}
        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha} // Atualiza o estado 'senha'
          secureTextEntry // Transforma o texto em bolinhas/asteriscos
          style={styles.input}
          mode="outlined"
          theme={textInputTheme}
          textColor={FITFLOW_COLORS.textLight}
        />

        {/* Botão Entrar */}
        <Button
          mode="contained"
          onPress={handleLoginPress} // Chama a função de login
          style={styles.button}
          contentStyle={{ paddingVertical: 8 }}
          labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
          loading={loading} // Mostra o spinner se estiver carregando
          disabled={loading} // Impede clicar duas vezes
        >
          Entrar
        </Button>

        {/* Link Esqueci a Senha */}
        <Text 
          style={styles.linkRed}
          onPress={() => navigation.navigate('RedefinirSenha')}
        >
          Esqueci a senha
        </Text>

        {/* Divisor Visual "-- ou --" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Link para criar conta */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem uma conta?</Text>
          <Text 
            style={styles.linkRedInGroup}
            onPress={() => navigation.navigate('RegistroUser')}
          >
            {' '}Cadastre-se
          </Text>
        </View>

        {/* Notificação flutuante de sucesso */}
        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => setVisibleSnackbar(false)}
          duration={2000}
          style={{ backgroundColor: '#2ecc71' }} // Fundo verde
        >
          Login efetuado com sucesso!
        </Snackbar>
      </ScrollView>
    </View>
  );
}