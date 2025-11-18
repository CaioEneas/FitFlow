/* --- app/(tabs)/_layout.tsx --- */
/* Este é o "mapa" que controla as abas e o menu lateral */

// Importa o React e os hooks 'useEffect' e 'useState'
import React, { useEffect, useState } from 'react';
// Importa o AsyncStorage para ler/gravar dados no dispositivo (ex: quem está logado)
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa o criador de navegação de Menu Lateral (Drawer)
import { createDrawerNavigator } from '@react-navigation/drawer';
// Importa o criador de navegação de Abas Inferiores (Tabs)
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Importa o pacote de ícones que vamos usar
import { Ionicons } from '@expo/vector-icons';
// Importa componentes básicos do React Native
import { Pressable, View, Text, StyleSheet } from 'react-native';
// Importa o hook para detectar o tema (claro/escuro) do dispositivo
import { useColorScheme } from '@/hooks/useColorScheme';
// Importa o tipo 'RouteProp' para ajudar o TypeScript a entender nossas rotas
import { RouteProp } from '@react-navigation/native';

// --- IMPORTES DAS TELAS DO FITFLOW ---
// Telas de autenticação e perfil
import LoginScreen from '../(tabs)/usuario/Login';
import RegistroUser from '../(tabs)/usuario/RegistroUser';
import GerenciamentoUser from './usuario/Perfil'; // Esta será nossa tela de "Perfil"
import GerenciamentoAgendamentoUser from '../(tabs)/agendamento/GerenciamentoAgendamentoUser'; // Nossos "Meus Agendamentos"
import AlterarSenhaScreen from '../(tabs)/usuario/AlterarSenha';
import RedefinirSenhaScreen from '../(tabs)/usuario/RedefinirSenha';
import CustomDrawerContent from './CustomDrawerContent'; // Componente para customizar o visual do menu lateral

// --- NOSSA NOVA HOME SCREEN ---
// Importa o arquivo index.tsx da *nova* pasta 'home' que criamos
import HomeScreen from './home/index'; 

// --- Imports de Admin (Mantidos por enquanto) ---
import GerenciamentoAgendamento from '../(tabs)/agendamento/GerenciamentoAgendamento';
import Relatorio from '../(tabs)/agendamento/Relatorio';
// Nota: Removemos o import do 'GerenciamentoServico' pois deletamos a pasta /servico/

// Define os tipos de tema que o app pode ter
type ColorScheme = 'light' | 'dark';

// --- MUDANÇA: PALETA DE CORES FITFLOW ---
// Centralizamos nossas cores em um objeto para fácil manutenção
const FITFLOW_COLORS = {
  background: '#1C1C1E', // Cinza quase preto (fundo)
  brandRed: '#E63946',   // Vermelho oficial da marca
  textLight: '#FFFFFF',  // Texto branco
  textGray: '#8A8A8E',   // Texto e ícones inativos
};

// --- Inicialização dos Navegadores ---
// Criamos as instâncias dos navegadores que vamos usar
const DrawerNavigator = createDrawerNavigator(); // O Menu Lateral
const TabNavigator = createBottomTabNavigator(); // As Abas Inferiores

// --- MUDANÇA: Tipagem dos Ícones ---
// Dizemos ao TypeScript quais nomes de ícones da Ionicons são válidos
type IconName =
  | 'home' | 'home-outline'
  | 'calendar' | 'calendar-outline'
  | 'person' | 'person-outline';

// ===================================================================
// --- FUNÇÃO "Tabs()" ---
// Esta função define e renderiza a BARRA DE ABAS INFERIOR
// ===================================================================
function Tabs() {
  // Retorna o componente do Navegador de Abas
  return (
    <TabNavigator.Navigator
      // Define a aba inicial que será aberta
      initialRouteName="Home"
      // 'screenOptions' aplica estilos e configurações a *todas* as abas
      screenOptions={({ route }: { route: RouteProp<any, any> }) => ({
        
        // 'tabBarIcon' é uma função que define qual ícone mostrar
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
          let iconName: IconName; // Variável para guardar o nome do ícone

          // Um 'switch' para decidir o ícone baseado no nome da rota (route.name)
          switch (route.name) {
            case 'Home':
              // Se a aba estiver 'focada' (ativa), usa o ícone 'home', senão, 'home-outline'
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Agendamentos':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home'; // Ícone padrão
          }
          // Retorna o componente de Ícone com o nome, tamanho e cor corretos
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        
        // --- MUDANÇA: Tema Dark do Header (Cabeçalho de cada aba) ---
        headerTintColor: FITFLOW_COLORS.textLight, // Cor do texto do título (ex: "Home")
        headerTitleStyle: { fontWeight: 'bold' }, // Estilo do texto do título
        headerBackground: () => ( // 'headerBackground' permite customizar o fundo
          // Renderiza uma View simples com a nossa cor de fundo
          <View style={{ flex: 1, backgroundColor: FITFLOW_COLORS.background }} />
        ),

        // --- MUDANÇA: Tema Dark da TabBar (A própria barra de abas) ---
        tabBarActiveTintColor: FITFLOW_COLORS.brandRed, // Cor do ícone e texto ATIVO
        tabBarInactiveTintColor: FITFLOW_COLORS.textGray, // Cor do ícone e texto INATIVO
        tabBarStyle: {
          backgroundColor: FITFLOW_COLORS.background, // Fundo da barra
          borderTopColor: FITFLOW_COLORS.brandRed, // Linha superior vermelha
          borderTopWidth: 1, // Espessura da linha
          paddingTop: 5, // Espaçamento interno
        },
        // Define o componente de Label (texto) abaixo do ícone
        tabBarLabel: ({ color, focused }) => (
          <Text style={{ color, fontSize: 12, fontWeight: focused ? 'bold' : 'normal' }}>
            {route.name}
          </Text>
        ),
      })}
    >
      {/* --- MUDANÇA: Nossas 3 Abas --- */}
      
      {/* 1. ABA HOME */}
      <TabNavigator.Screen 
        name="Home" // Nome da rota (usado no 'switch' acima)
        component={HomeScreen} // Componente/Tela que será renderizado
        options={{ title: 'Home' }} // Título que aparece no cabeçalho
      />
      
      {/* 2. ABA AGENDAMENTOS */}
      <TabNavigator.Screen 
        name="Agendamentos" 
        component={GerenciamentoAgendamentoUser} // Reaproveitando a tela do professor
        options={{ title: 'Meus Agendamentos' }} 
      />
      
      {/* 3. ABA PERFIL */}
      <TabNavigator.Screen 
        name="Perfil" 
        component={GerenciamentoUser} // Reaproveitando a tela do professor
        options={{ title: 'Meu Perfil' }} 
      />
    </TabNavigator.Navigator>
  );
}
// ===================================================================
// --- FIM DA FUNÇÃO "Tabs()" ---
// ===================================================================


// ===================================================================
// --- FUNÇÃO "DrawerLayout()" ---
// Este é o componente principal do arquivo (export default)
// Define o MENU LATERAL e a lógica de login/logout
// ===================================================================
export default function DrawerLayout() {
  // Hook para ler o tema do dispositivo (claro/escuro)
  const colorScheme = useColorScheme() as ColorScheme;
  // Estado para guardar o tipo de usuário ('0' = admin, '1' = usuário, null = deslogado)
  const [userType, setUserType] = useState<string | null>(null);
  // Estado para controlar o 'loading' inicial
  const [loading, setLoading] = useState(true);

  // 'useEffect' roda quando o componente é montado (uma vez, por causa do '[]')
  useEffect(() => {
    // Função assíncrona para buscar os dados do usuário
    const fetchUserData = async () => {
      try {
        // Tenta ler o 'userType' salvo no disco do celular
        const userTypeStored = await AsyncStorage.getItem('userType');
        // Atualiza o estado com o valor encontrado (ou null)
        setUserType(userTypeStored);
      } catch (error) {
        // Se der erro, avisa no console
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        // Independentemente de sucesso ou erro, marca o 'loading' como falso
        setLoading(false);
      }
    };
    // Chama a função
    fetchUserData();
  }, []); // '[]' = "Rodar apenas uma vez"

  // Função para fazer logout
  const handleLogout = async () => {
    try {
      // Limpa *todos* os dados salvos no AsyncStorage
      await AsyncStorage.clear();
      // Reseta o estado 'userType' para null (deslogado)
      setUserType(null); 
    } catch (error) {
      console.error('Erro ao remover dados do usuário:', error);
    }
  };

  // Função para recarregar os dados do usuário (usada ao abrir o menu)
  const loadUserData = async () => {
     try {
        // Lê novamente o 'userType' do AsyncStorage
        const userTypeStored = await AsyncStorage.getItem('userType');
        // Atualiza o estado
        setUserType(userTypeStored);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
  };

  // Se estiver carregando (buscando dados), não mostra nada
  if (loading) {
    return null;
  }

  // --- Renderização do Menu Lateral (Drawer) ---
  return (
    <DrawerNavigator.Navigator
      // Passa um componente customizado para o visual do Drawer (opcional)
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      // 'screenOptions' aplica estilos a *todas* as telas do Drawer
      screenOptions={({ navigation }) => ({
        // --- MUDANÇA: Tema Dark do Menu Lateral ---
        drawerStyle: {
          backgroundColor: FITFLOW_COLORS.background, 
          width: 240, // Largura do menu
        },
        drawerActiveTintColor: FITFLOW_COLORS.brandRed, // Cor do item ATIVO
        drawerInactiveTintColor: FITFLOW_COLORS.textLight, // Cor do item INATIVO
        
        // --- MUDANÇA: Tema Dark do Header (do Drawer) ---
        headerTintColor: FITFLOW_COLORS.textLight, // Cor do título
        headerBackground: () => ( // Fundo do cabeçalho
          <View style={{ flex: 1, backgroundColor: FITFLOW_COLORS.background }} />
        ),

        // Define o ícone de Menu (sanduíche) à esquerda
        headerLeft: () => (
          <Pressable
            // 'onPress' é o clique no ícone de menu
            onPress={async () => {
              // Recarrega os dados do usuário (para o menu saber se ele logou/deslogou)
              await loadUserData();
              // Abre ou fecha o menu lateral
              navigation.toggleDrawer();
            }}
            style={{ marginLeft: 15 }} // Margem para não colar na borda
          >
            <Ionicons name="menu" size={28} color={FITFLOW_COLORS.textLight} />
          </Pressable>
        ),
      })}
    >
      {/* Tela Principal (Home com Abas) */}
      <DrawerNavigator.Screen
        name="HomeTabs" // Nome interno desta tela no Drawer
        component={Tabs} // O componente que ela renderiza é a nossa função "Tabs"
        options={{
          title: 'FitFlow', // Título no cabeçalho
          headerTitleAlign: 'center', // Centraliza o título
          drawerLabel: 'Início', // Texto que aparece no menu lateral
          drawerIcon: ({ color }) => ( // Ícone no menu lateral
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
      />

      {/* --- Lógica de Visualização Condicional --- */}

      {/* 1. Telas para NÃO LOGADOS */}
      {/* 'userType' é diferente de '0' E diferente de '1' (ou seja, é null) */}
      {userType !== '0' && userType !== '1' && (
        <>
          <DrawerNavigator.Screen name="Login" component={LoginScreen} options={{ drawerIcon: ({ color }) => ( <Ionicons name="log-in-outline" size={28} color={color} /> ) }} />
          <DrawerNavigator.Screen name="RegistroUser" component={RegistroUser} options={{ title: 'Cadastrar', drawerIcon: ({ color }) => ( <Ionicons name="person-add-outline" size={28} color={color} /> ) }} />
          {/* Tela de Redefinir Senha (não aparece no menu, mas é navegável) */}
          <DrawerNavigator.Screen name="RedefinirSenha" component={RedefinirSenhaScreen} options={{ title: 'Redefinir Senha', drawerItemStyle: { display: 'none' } }} />
        </>
      )}

      {/* 2. Telas para ADMIN (userType === '0') */}
      {userType === '0' && (
        <>
          <DrawerNavigator.Screen name="GerenciamentoAgendamento" component={GerenciamentoAgendamento} options={{ title: 'Gerenciar Agendamentos', drawerIcon: ({ color }) => ( <Ionicons name="construct-outline" size={28} color={color} /> ) }} />
          <DrawerNavigator.Screen name="Relatorio" component={Relatorio} options={{ title: 'Relatórios', drawerIcon: ({ color }) => ( <Ionicons name="document-text-outline" size={28} color={color} /> ) }} />
        </>
      )}

      {/* 3. Telas para LOGADOS (Admin OU Usuário) */}
      {/* 'userType' é '0' OU '1' */}
      {(userType === '0' || userType === '1') && (
        <>
          <DrawerNavigator.Screen name="AlterarSenha" component={AlterarSenhaScreen} options={{ title: 'Alterar Senha', drawerIcon: ({ color }) => ( <Ionicons name="key-outline" size={28} color={color} /> ) }} />
          {/* Item "Sair" */}
          <DrawerNavigator.Screen
            name="Sair"
            options={{
              title: 'Sair',
              drawerIcon: ({ color }) => <Ionicons name="log-out-outline" size={28} color={color} />,
            }}
            // 'listeners' escutam eventos de navegação
            listeners={{
              focus: () => { handleLogout(); }, // Quando "focar" (clicar) no item, chama o logout
            }}
            component={() => null} // Não renderiza tela, apenas executa a ação
          />
        </>
      )}
    </DrawerNavigator.Navigator>
  );
}