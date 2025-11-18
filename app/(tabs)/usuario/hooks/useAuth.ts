/* --- app/(tabs)/usuario/hooks/useAuth.ts --- */
/* (Versão CORRIGIDA do import do AsyncStorage e Comentada) */

import { useState } from 'react';
import axios from 'axios';
// --- A CORREÇÃO ESTÁ AQUI ---
// Removemos o '-a-' extra. O pacote correto é 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
// Importa a URL da sua API (ex: http://localhost:3000)
import API_URL from '../../../../conf/api'; // confirme se este caminho está certo

// Este é o nosso Hook (Padrão Singleton)
export const useAuth = () => {
  // --- Estados ---
  // Estado para controlar o spinner de "carregando"
  const [loading, setLoading] = useState(false);
  // Estado para controlar o Snackbar de "Login com sucesso"
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  // --- Função Principal ---
  // 'navigation: any' é ok, mas idealmente seria tipado
  const handleLogin = async (email: string, senha: string, navigation: any) => {
    // Validação simples (embora o 'validateLoginFields' já faça isso)
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return; // Para a execução
    }

    // Começa o login, ativa o spinner
    setLoading(true);

    // Bloco 'try...catch' para capturar erros de rede ou de lógica
    try {
      // Faz a chamada POST para o backend com os dados
      const response = await axios.post(`${API_URL}/usuarios/login`, {
        email,
        senha,
      });

      // Pega o objeto 'usuario' de dentro da resposta da API
      const usuario = response?.data?.usuario;

      // Se o backend não retornar um 'usuario', é um erro
      if (!usuario) {
        throw new Error('Resposta da API está vazia ou mal formatada.');
      }

      // Desestrutura os dados que recebemos do backend
      const {
        id,
        email: userEmail,
        nome,
        tipoUsuario,
        foto,
      } = usuario;

      // Loga no console para vermos o que recebemos
      console.log('Usuário recebido:', usuario);

      // Valida se os dados essenciais vieram
      if (!id || !userEmail || !nome || tipoUsuario === undefined) {
        throw new Error('Dados do usuário incompletos na resposta da API.');
      }

      // --- SUCESSO ---
      // Salva os dados no disco do celular (AsyncStorage)
      await AsyncStorage.multiSet([
        ['userId', id.toString()], // Converte IDs para string
        ['nome', nome],
        ['userEmail', userEmail],
        ['userType', tipoUsuario.toString()], // Converte tipo para string
        ['userPhoto', foto || ''], // Salva '' (string vazia) se a foto for null
      ]);

      // (Seu debug de verificação)
      console.log('✅ Verificação pós-salvamento das variáveis de ambiente:');
      // ... (código de verificação) ...

      // Ativa o Snackbar de "Login efetuado com sucesso!"
      setVisibleSnackbar(true);

      // --- NAVEGAÇÃO CORRIGIDA ---
      // Espera 1 segundo (para o usuário ver o Snackbar) e navega
      setTimeout(() => {
        // 'navigation.reset' limpa a pilha de navegação (o usuário não pode "voltar")
        navigation.reset({ 
            index: 0, 
            // 'HomeTabs' é o nome da tela no _layout.tsx que contém nossas abas
            routes: [{ name: 'HomeTabs' }] 
        });
      }, 1000); // 1000ms = 1 segundo

    } catch (error: any) { // Captura qualquer tipo de erro
      // Bloco de tratamento de erros
      if (axios.isAxiosError(error) && error.response) {
        Alert.alert('Erro', error.response.data.error || 'E-mail ou senha inválidos!');
      } else if (error.request) {
        Alert.alert('Erro', 'Falha ao conectar ao servidor. Verifique sua conexão.');
      } else {
        Alert.alert('Erro', error.message || 'Erro inesperado ao fazer login.');
      }
    } finally {
      // 'finally' executa sempre, dando certo ou errado
      // Desliga o spinner de carregando
      setLoading(false);
    }
  };

  // Retorna os estados e a função para o 'Login.tsx' poder usar
  return {
    loading,
    visibleSnackbar,
    setVisibleSnackbar,
    handleLogin,
  };
};