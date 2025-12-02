import React, { useEffect, useState, useCallback } from 'react';
import { View, Pressable, ActivityIndicator, Text } from 'react-native'; 

// AsyncStorage: É a "memória" do celular. Usamos para ver se o usuário já entrou antes.
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navegadores: Ferramentas para criar os menus
import { createDrawerNavigator } from '@react-navigation/drawer'; // Menu lateral (Hambúrguer)
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Barra de baixo

// Ferramentas úteis
import { useFocusEffect } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

// Importação das Telas (Páginas)
import LoginScreen from './usuario/Login';
import RegistroUser from './usuario/RegistroUser';
import AlterarSenhaScreen from './usuario/AlterarSenha';
import RedefinirSenhaScreen from './usuario/RedefinirSenha';
import CustomDrawerContent from './CustomDrawerContent'; 
import HomeScreen from './home/index'; 
import MeuPerfilScreen from './usuario/Perfil'; 
import MeusAgendamentos from './agendamento/MeusAgendamentos'; 
import GerenciamentoUser from './usuario/Perfil'; 

// Cores do aplicativo
const FITFLOW_COLORS = {
  background: '#1C1C1E', 
  brandRed: '#E63946',   
  textLight: '#FFFFFF',  
  textGray: '#8A8A8E',   
};

const DrawerNavigator = createDrawerNavigator(); 
const TabNavigator = createBottomTabNavigator(); 

// Um componente vazio só para o botão "Sair" não dar erro visual
const LogoutComponent = () => <View />;

// --- MENU DE ABAS (A barra lá embaixo) ---
function Tabs() {
  return (
    <TabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={({ route }: { route: RouteProp<any, any> }) => ({
        // Escolhe o ícone certo para cada aba
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
          let iconName: any = 'home'; 
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Agendamentos') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Estilos visuais (cores, negrito, etc)
        headerTintColor: FITFLOW_COLORS.textLight, 
        headerTitleStyle: { fontWeight: 'bold' },
        headerShown: false, // Esconde o título (já temos o do menu lateral)
        headerBackground: () => ( <View style={{ flex: 1, backgroundColor: FITFLOW_COLORS.background }} /> ),
        tabBarActiveTintColor: FITFLOW_COLORS.brandRed, 
        tabBarInactiveTintColor: FITFLOW_COLORS.textGray, 
        tabBarStyle: { backgroundColor: FITFLOW_COLORS.background, borderTopColor: FITFLOW_COLORS.brandRed, borderTopWidth: 1, paddingTop: 5 },
        tabBarLabel: ({ color }) => <Text style={{ color, fontSize: 12 }}>{route.name}</Text>,
      })}
    >
      <TabNavigator.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <TabNavigator.Screen name="Agendamentos" component={MeusAgendamentos} options={{ title: 'Meus Agendamentos' }} />
      <TabNavigator.Screen name="Perfil" component={MeuPerfilScreen} options={{ title: 'Meu Perfil' }} />
    </TabNavigator.Navigator>
  );
}

// --- MENU PRINCIPAL (A Gaveta Lateral) ---
export default function DrawerLayout() {
  // Estados: Variáveis que controlam o comportamento da tela
  const [isLoggedIn, setIsLoggedIn] = useState(false); // O usuário está logado?
  const [isAdmin, setIsAdmin] = useState(false); // O usuário é chefe?
  const [loading, setLoading] = useState(true); // Ainda está carregando?

  // Função: Verificar Login
  // Ela vai na memória do celular e vê se tem a "carteirinha" (sessão) salva.
  const checkLogin = async () => {
    try {
      const session = await AsyncStorage.getItem('fitflow_user_session');
      if (session) {
        setIsLoggedIn(true); // Achou! Pode entrar.
        const user = JSON.parse(session);
        setIsAdmin(user.userType === '0'); // Verifica se é admin
      } else {
        setIsLoggedIn(false); // Não achou. Bloqueia.
        setIsAdmin(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoggedIn(false);
    } finally {
      setLoading(false); // Terminou de verificar, pode mostrar a tela.
    }
  };

  // Roda assim que o app abre
  useEffect(() => {
    checkLogin();
  }, []);

  // Roda toda vez que a tela ganha foco (ex: ao voltar do login)
  useFocusEffect(
    useCallback(() => {
      checkLogin();
    }, [])
  );

  // Função Sair: Apaga a carteirinha e atualiza a tela
  const handleLogout = async () => {
    await AsyncStorage.removeItem('fitflow_user_session');
    setIsLoggedIn(false);
  };

  // Tela de Carregamento (Spinner)
  if (loading) return <View style={{flex:1, backgroundColor: '#1C1C1E'}}><ActivityIndicator size="large" color="#E63946"/></View>;

  return (
    <DrawerNavigator.Navigator
      // Se estiver logado, a tela inicial é HomeTabs. Se não, é Login.
      initialRouteName={isLoggedIn ? "HomeTabs" : "Login"}
      
      // Usa nosso menu bonito com foto
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      
      screenOptions={({ navigation }) => ({
        drawerStyle: { backgroundColor: FITFLOW_COLORS.background, width: 240 },
        drawerActiveTintColor: FITFLOW_COLORS.brandRed, 
        drawerInactiveTintColor: FITFLOW_COLORS.textLight, 
        headerTintColor: FITFLOW_COLORS.textLight, 
        headerStyle: { backgroundColor: FITFLOW_COLORS.background },
        
        // Quando clicar no botão do menu, verifica o login de novo (para atualizar foto/nome se mudou)
        headerLeft: () => (
          <Pressable 
            onPress={async () => { 
              await checkLogin(); 
              navigation.toggleDrawer(); 
            }} 
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={28} color={FITFLOW_COLORS.textLight} />
          </Pressable>
        ),
      })}
    >
      {/* LISTA DE TODAS AS TELAS:
         Todas as telas existem aqui, mas usamos um truque visual:
         'display: flex' = Visível no menu
         'display: none' = Invisível no menu
      */}

      {/* 1. TABS (Home) - Só aparece se estiver logado */}
      <DrawerNavigator.Screen 
        name="HomeTabs" 
        component={Tabs} 
        options={{ 
          title: 'FitFlow', 
          headerTitleAlign: 'center', 
          drawerLabel: 'Início', 
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />,
          drawerItemStyle: { display: isLoggedIn ? 'flex' : 'none' } 
        }} 
      />

      {/* 2. LOGIN - Só aparece se NÃO estiver logado */}
      <DrawerNavigator.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ 
          title: 'Login', 
          headerShown: false,
          swipeEnabled: false,
          drawerIcon: ({ color }) => <Ionicons name="log-in-outline" size={28} color={color} />,
          drawerItemStyle: { display: !isLoggedIn ? 'flex' : 'none' } 
        }} 
      />
      
      {/* 3. CADASTRO - Só aparece se NÃO estiver logado */}
      <DrawerNavigator.Screen 
        name="RegistroUser" 
        component={RegistroUser} 
        options={{ 
          title: 'Cadastrar', 
          headerShown: false,
          drawerIcon: ({ color }) => <Ionicons name="person-add-outline" size={28} color={color} />,
          drawerItemStyle: { display: !isLoggedIn ? 'flex' : 'none' }
        }} 
      />

      {/* 4. REDEFINIR SENHA - Sempre invisível (só acessível por clique em link) */}
      <DrawerNavigator.Screen 
        name="RedefinirSenha" 
        component={RedefinirSenhaScreen} 
        options={{ 
          title: 'Redefinir Senha', 
          headerShown: false,
          drawerItemStyle: { display: 'none' } 
        }} 
      />

      {/* 5. ADMIN - Só aparece se for Admin E estiver logado */}
      <DrawerNavigator.Screen 
        name="GerenciamentoUser" 
        component={GerenciamentoUser} 
        options={{ 
          title: 'Painel Admin', 
          drawerIcon: ({ color }) => <Ionicons name="shield-checkmark-outline" size={28} color={color} />,
          drawerItemStyle: { display: isAdmin && isLoggedIn ? 'flex' : 'none' }
        }} 
      />

      {/* 6. ALTERAR SENHA - Só aparece se estiver logado */}
      <DrawerNavigator.Screen 
        name="AlterarSenha" 
        component={AlterarSenhaScreen} 
        options={{ 
          title: 'Alterar Senha', 
          drawerIcon: ({ color }) => <Ionicons name="key-outline" size={28} color={color} />,
          drawerItemStyle: { display: isLoggedIn ? 'flex' : 'none' } 
        }} 
      />

      {/* 7. SAIR - Só aparece se estiver logado */}
      <DrawerNavigator.Screen 
        name="Sair" 
        component={LogoutComponent} 
        options={{ 
          title: 'Sair', 
          drawerIcon: ({ color }) => <Ionicons name="log-out-outline" size={28} color={color} />,
          drawerItemStyle: { display: isLoggedIn ? 'flex' : 'none' } 
        }} 
        listeners={{ focus: () => handleLogout() }} 
      />

    </DrawerNavigator.Navigator>
  );
}