// React e useState: O 'useState' é a memória do componente.
import React, { useState } from 'react';

// Componentes nativos: Blocos de construção básicos (View = caixa, Image = imagem, Alert = popup).
import { View, Image, Alert, ScrollView } from 'react-native';

// React Native Paper: Biblioteca que deixa os inputs e botões bonitos (Material Design).
import { TextInput, Button, Text } from 'react-native-paper';

// Navegação: Permite ir e voltar de telas.
import { useNavigation } from '@react-navigation/native';

// StatusBar: Controla a barrinha lá no topo onde fica a bateria e hora.
import { StatusBar } from 'expo-status-bar';

// AsyncStorage: O 'Banco de Dados' do celular. Salva coisas mesmo se fechar o app.
import AsyncStorage from '@react-native-async-storage/async-storage';

// Estilos: Importa a folha de estilos separada (para organizar o código).
import { styles } from './styles/RegistroUserStyles'; 

// --- CONFIGURAÇÃO DE CORES (TEMA) ---
// Definimos as cores aqui para facilitar a mudança depois.
const FITFLOW_COLORS = {
  brandRed: '#E63946',
  textLight: '#FFFFFF',
  textGray: '#8A8A8E',
};

// Configuração visual dos campos de texto (Inputs)
const textInputTheme = {
  colors: {
    primary: FITFLOW_COLORS.brandRed,    // Cor da borda quando clica
    onSurface: FITFLOW_COLORS.textLight, // Cor do texto digitado
    onSurfaceVariant: FITFLOW_COLORS.textGray, // Cor do placeholder (dica)
    text: FITFLOW_COLORS.textLight,
    placeholder: FITFLOW_COLORS.textGray,
  }
};

// --- COMPONENTE PRINCIPAL ---
export default function RegistroUserScreen() {
  
  // 2. ESTADOS (A Memória da Tela)
  // Cada 'useState' cria uma variável e uma função para mudar essa variável.
  // Ex: 'nome' é o valor atual. 'setNome' é a função que atualiza o valor.
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // 'loading' serve para travar o botão enquanto o app está salvando.
  const [loading, setLoading] = useState(false); 

  // Inicializa o hook de navegação
  const navigation = useNavigation();

  // 3. O CÉREBRO (Lógica de Cadastro)
  // 'async' significa que essa função vai demorar um pouco (ler/gravar dados)
  const handleCadastroPress = async () => {
    
    // VALIDAÇÃO: Antes de tudo, checa se está tudo preenchido.
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return; // 'return' para a função aqui. Não deixa continuar.
    }

    // Checa se as senhas são iguais
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Ativa o carregamento
    setLoading(true);

    try {
      // LEITURA DO BANCO
      // AsyncStorage só guarda TEXTO (String).
      const existingUsersJson = await AsyncStorage.getItem('fitflow_users');
      
      let users = [];
      
      // Se já tiver gente cadastrada, transforma o Texto em Objeto
      if (existingUsersJson) {
        users = JSON.parse(existingUsersJson);
      }

      // REGRA DE NEGÓCIO: Não pode ter dois e-mails iguais.
      // O .find procura na lista se alguém tem o mesmo email.
      const userExists = users.find((user: any) => user.email.toLowerCase() === email.toLowerCase());

      if (userExists) {
        Alert.alert('Erro', 'Este e-mail já está cadastrado.');
        setLoading(false); // Para o carregamento
        return;
      }

      // CRIAÇÃO: Monta o pacote com os dados do novo usuário.
      const newUser = {
        id: Date.now().toString(), // Cria um ID único baseado na hora atual
        nome: nome,
        email: email.toLowerCase(), // Salva tudo minúsculo para evitar confusão
        senha: senha,
      };

      // SALVAMENTO: Adiciona o novo na lista antiga
      users.push(newUser);
      
      // Transforma a lista de volta em TEXTO e salva no celular
      await AsyncStorage.setItem('fitflow_users', JSON.stringify(users));

      setLoading(false); // Terminou, desliga o carregamento

      // SUCESSO: Avisa o usuário e volta para o login
      Alert.alert(
        'Sucesso', 
        'Conta criada com sucesso! Faça login para continuar.',
        [
          // Quando clicar em OK, executa navigation.goBack()
          { text: "OK", onPress: () => navigation.goBack() }
        ]
      );

    } catch (error) {
      // Se der qualquer erro técnico (memória cheia, erro de sistema), cai aqui.
      console.log(error);
      setLoading(false);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados. Tente novamente.');
    }
  };

  // 4. O CORPO (Interface Visual)
  return (
    <View style={styles.blackContainer}>
      <StatusBar style="light" />
      
      {/* ScrollView permite rolar a tela se o teclado cobrir os campos */}
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        {/* LOGO */}
        <View style={styles.imageWrapper}>
          <Image 
            source={require('../../../assets/images/logoff.png')} 
            style={styles.image} 
            resizeMode="contain"
          />
        </View>

        {/* --- CAMPOS DE TEXTO (Inputs) --- */}
        {/* Cada input liga o visual à memória (value={estado}) e atualiza a memória (onChangeText={setEstado}) */}
        
        <TextInput
          label="Nome Completo"
          value={nome}             // Mostra o que está na memória
          onChangeText={setNome}   // Atualiza a memória quando digita
          style={styles.input}
          autoCapitalize="words"   // Deixa a primeira letra maiúscula
          mode="outlined"
          theme={textInputTheme}
          textColor={FITFLOW_COLORS.textLight}
        />

        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"    // Sem maiúsculas automáticas para email
          keyboardType="email-address" // Teclado com @
          mode="outlined"
          theme={textInputTheme} 
          textColor={FITFLOW_COLORS.textLight}
        />

        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry          // Transforma texto em asteriscos
          style={styles.input}
          mode="outlined"
          theme={textInputTheme} 
          textColor={FITFLOW_COLORS.textLight}
        />

        <TextInput
          label="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          theme={textInputTheme} 
          textColor={FITFLOW_COLORS.textLight}
        />

        {/* BOTÃO CADASTRAR */}
        <Button
          mode="contained"
          onPress={handleCadastroPress} // Chama a função "Cérebro" quando clica
          loading={loading} // Mostra se estiver carregando
          disabled={loading} // Impede clicar duas vezes
          style={styles.button}
          contentStyle={{ paddingVertical: 8 }}
          labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
        >
          Cadastrar
        </Button>

        {/* LINK PARA VOLTAR AO LOGIN */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Já tem uma conta?</Text>
          <Text 
            style={styles.linkRedInGroup}
            onPress={() => navigation.goBack()} // Volta para a tela anterior
          >
            {' '}Faça login
          </Text>
        </View>
        
      </ScrollView>
    </View>
  );
}