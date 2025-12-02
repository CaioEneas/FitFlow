/* --- app/(tabs)/usuario/RedefinirSenha.tsx --- */
/* Tela para o utilizador pedir a redefinição de senha */

import React, { useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles/RedefinirSenhaStyles';

// --- Configuração do Tema (Vermelho/Branco) ---
const FITFLOW_COLORS = {
  brandRed: '#E63946',
  textLight: '#FFFFFF',
  textGray: '#8A8A8E',
};

const textInputTheme = {
  colors: {
    primary: FITFLOW_COLORS.brandRed,     // Cor do Foco
    onSurface: FITFLOW_COLORS.textLight,   // Cor do Texto
    onSurfaceVariant: FITFLOW_COLORS.textGray, // Cor do Label
    text: FITFLOW_COLORS.textLight,
    placeholder: FITFLOW_COLORS.textGray,
  }
};

export default function RedefinirSenhaScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  // Função simulada de envio
  const handleRedefinir = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira o seu e-mail.');
      return;
    }

    // (Aqui entraria a chamada para a API)
    
    Alert.alert(
      'Email Enviado!',
      `Enviamos um link de recuperação para ${email}. Verifique a sua caixa de entrada.`,
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        
        <Text style={styles.title}>Esqueceu a Senha?</Text>
        <Text style={styles.subtitle}>
          Não se preocupe! Insira o seu e-mail abaixo e enviaremos instruções para recuperar a sua conta.
        </Text>

        <TextInput
          label="E-mail cadastrado"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          theme={textInputTheme}
          textColor={FITFLOW_COLORS.textLight}
        />

        <Button 
          mode="contained" 
          onPress={handleRedefinir}
          style={styles.button}
          labelStyle={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}
        >
          Enviar Link
        </Button>

        <Text 
          style={styles.backLink}
          onPress={() => navigation.goBack()}
        >
          Voltar para o Login
        </Text>

      </ScrollView>
    </View>
  );
}