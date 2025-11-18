/* --- app/(tabs)/usuario/RegistroUser.tsx --- */
/* Tela de Cadastro de Usuário */

import React, { useState } from 'react';
import { View, Image, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Importa os *novos* estilos de cadastro
import { styles } from './styles/RegistroUserStyles'; 

// --- Tema dos Inputs (Copiado do Login.tsx) ---
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
// --- Fim do Tema ---

export default function RegistroUserScreen() {
  // --- Estados ---
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // --- Hooks ---
  const navigation = useNavigation();

  // --- Handlers ---
  const handleCadastroPress = () => {
    // 1. Validação simples de interface
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // 3. (Temporário) Sucesso da interface
    Alert.alert('Conta criada com sucesso!');
    navigation.goBack(); // Volta para a tela de Login
  };

  // --- Renderização (JSX) ---
  return (
    <View style={styles.blackContainer}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        <View style={styles.imageWrapper}>
          <Image 
            // (Use o mesmo logo da tela de login)
            source={require('../../../assets/images/logoff.png')} 
            style={styles.image} 
            resizeMode="contain"
          />
        </View>

        {/* --- Inputs de Cadastro --- */}
        <TextInput
          label="Nome Completo"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          autoCapitalize="words" 
          mode="outlined"
          theme={textInputTheme}
          textColor={FITFLOW_COLORS.textLight}
        />

        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          theme={textInputTheme} 
          textColor={FITFLOW_COLORS.textLight}
        />

        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
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

        <Button
          mode="contained"
          onPress={handleCadastroPress} 
          style={styles.button}
          contentStyle={{ paddingVertical: 8 }}
          labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
        >
          Cadastrar
        </Button>

        {/* Seção "Já tem uma conta?" */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Já tem uma conta?</Text>
          <Text 
            style={styles.linkRedInGroup}
            // 'goBack()' volta para a tela anterior (Login)
            onPress={() => navigation.goBack()} 
          >
            {' '}Faça login
          </Text>
        </View>
        
      </ScrollView>
    </View>
  );
}