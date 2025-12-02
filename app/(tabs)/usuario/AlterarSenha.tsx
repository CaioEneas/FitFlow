import React, { useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// AsyncStorage: "Banco de Dados"
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { styles } from './styles/AlterarSenhaStyles';

// Configuração de cores e tema )
const FITFLOW_COLORS = {
  brandRed: '#E63946',
  textLight: '#FFFFFF',
  textGray: '#8A8A8E',
};

const textInputTheme = {
  colors: {
    primary: FITFLOW_COLORS.brandRed,
    onSurface: FITFLOW_COLORS.textLight,
    onSurfaceVariant: FITFLOW_COLORS.textGray,
    text: FITFLOW_COLORS.textLight,
    placeholder: FITFLOW_COLORS.textGray,
  }
};

// COMPONENTE PRINCIPAL 
export default function AlterarSenhaScreen() {
  const navigation = useNavigation();
  
  // Guardamos o que o usuário digita nos campos de texto
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // Controla o carregamento (spinner) do botão
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    
    // Validações de Segurança Básicas
    // Não deixa enviar campo vazio
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    // Garante que a pessoa não digitou a nova senha errado na confirmação
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'A nova senha e a confirmação não coincidem.');
      return;
    }

    // Regra de segurança mínima
    if (novaSenha.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Inicia o processo de salvamento (trava o botão)
    setLoading(true);

    try {
      // Verificar quem está logado 
      // Buscamos o "crachá" do usuário que está usando o app agora
      const sessionJson = await AsyncStorage.getItem('fitflow_user_session');
      
      if (!sessionJson) {
        Alert.alert('Erro', 'Nenhum usuário logado encontrado. Faça login novamente.');
        navigation.goBack();
        return;
      }

      const currentUser = JSON.parse(sessionJson);

      // Verificar se a Senha Atual está correta
      // Compara o que foi digitado com o que está no "crachá" (sessão)
      if (currentUser.senha !== senhaAtual) {
        Alert.alert('Senha Incorreta', 'A senha atual digitada não confere.');
        setLoading(false); // Destrava o botão
        return;
      }

      // Buscar o "Banco de Dados"
      // Precisamos atualizar a senha lá também, senão no próximo login a senha antiga voltaria a valer
      const usersJson = await AsyncStorage.getItem('fitflow_users');
      if (!usersJson) {
        Alert.alert('Erro', 'Base de dados de usuários não encontrada.');
        setLoading(false);
        return;
      }

      let users = JSON.parse(usersJson);

      // Encontrar o usuário certo na lista
      // Procuramos na lista alguém com o mesmo e-mail do usuário logado
      const userIndex = users.findIndex((u: any) => u.email === currentUser.email);

      if (userIndex !== -1) {
        // --- MOMENTO DA GRAVAÇÃO ---
        
        // Atualiza no Banco de Dados Geral 
        users[userIndex].senha = novaSenha; // Troca a senha na lista
        await AsyncStorage.setItem('fitflow_users', JSON.stringify(users)); // Salva a lista

        // Atualiza na Sessão Atual 
        // Se não fizermos isso, o usuário teria que deslogar e logar de novo para a senha valer
        currentUser.senha = novaSenha; 
        await AsyncStorage.setItem('fitflow_user_session', JSON.stringify(currentUser));

        setLoading(false); // Terminou

        // Avisa e volta para o perfil
        Alert.alert(
          'Sucesso',
          'Sua senha foi alterada com sucesso!',
          [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]
        );
      } else {
        setLoading(false);
        Alert.alert('Erro', 'Usuário não encontrado no banco de dados.');
      }

    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar alterar a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        <Text style={styles.title}>Alterar Senha</Text>

        {/* Senha Atual */}
        <TextInput
          label="Senha Atual"
          value={senhaAtual}
          onChangeText={setSenhaAtual}
          secureTextEntry // Esconde o texto (***)
          mode="outlined"
          style={styles.input}
          theme={textInputTheme}
          textColor={FITFLOW_COLORS.textLight}
        />

        {/* Nova Senha */}
        <TextInput
          label="Nova Senha"
          value={novaSenha}
          onChangeText={setNovaSenha}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          theme={textInputTheme}
          textColor={FITFLOW_COLORS.textLight}
        />

        {/* Confirmação */}
        <TextInput
          label="Confirmar Nova Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          theme={textInputTheme}
          textColor={FITFLOW_COLORS.textLight}
        />

        {/* Botão de Salvar */}
        <Button 
          mode="contained" 
          onPress={handleSalvar} // Chama a lógica do "Cérebro"
          loading={loading} // Carregando
          disabled={loading} // Impede clicar 2x
          style={styles.button}
          labelStyle={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}
        >
          Salvar Nova Senha
        </Button>

        {/* Botão Cancelar */}
        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()} 
          style={styles.cancelButton}
          textColor={FITFLOW_COLORS.textGray}
        >
          Cancelar
        </Button>

      </ScrollView>
    </View>
  );
}