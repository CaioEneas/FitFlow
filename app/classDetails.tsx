// Importa o React e o 'useState' para guardar o dia selecionado
import React, { useState } from 'react';
// Importa componentes básicos do React Native
import { View, Text, StyleSheet, Alert } from 'react-native';
// Importa hooks de navegação do Expo Router
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
// Importa a biblioteca de Calendário que instalamos
import { Calendar, LocaleConfig } from 'react-native-calendars';
// Importa o componente de Botão do React Native Paper
import { Button } from 'react-native-paper';
// Importa o controle da Barra de Status
import { StatusBar } from 'expo-status-bar';

// --- PALETA DE CORES ---
const COLORS = {
  background: '#1C1C1E', // Fundo principal
  surface: '#2C2C2E',    // Fundo de "cartões" (calendário, informações)
  textLight: '#FFFFFF',  // Texto branco
  textGray: '#8A8A8E',   // Texto cinza
  brandRed: '#E63946',   // Vermelho principal
};

// Configura o calendário para Português
LocaleConfig.locales['pt-br'] = {
  monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: 'Hoje'
} as any;

// Define o padrão do calendário como 'pt-br'
LocaleConfig.defaultLocale = 'pt-br';


// --- Componente Principal da Tela ---
export default function ClassDetailsScreen() {
  // --- Lógica da Tela ---

  // 1. useRouter para podermos "Voltar"
  const router = useRouter(); 
  
  // 2. useLocalSearchParams para *receber* os dados que o Card enviou
  // (Funciona com a URL que criamos: /classDetails?title=...)
  const params = useLocalSearchParams();
  const { title, professor, academia, duration } = params;

  // 3. useState para guardar o dia selecionad
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // 4. Função para o botão de Agendar
  const handleAgendar = () => {
    if (selectedDay) { 
      // O resultado é um array: ["2025", "11", "20"]
      const parts = selectedDay.split('-');
      
      // 2. Array para o formato DD/MM/YYYY
      const dataFormatada = `${parts[2]}/${parts[1]}/${parts[0]}`;

    // 3. Usamos a 'dataFormatada' no Alerta
    Alert.alert(
      "Agendamento Confirmado!",
      `Aula de ${title} com ${professor} agendada para ${dataFormatada}.`
    );
    // Volta para a tela Home
    router.back();
  }
  };

  // --- Renderização (O que aparece na tela) ---
  return (
    <View style={styles.container}>
      {/* Configura o cabeçalho (Header) desta tela */}
      <Stack.Screen 
        options={{
          title: 'Detalhes da Aula', // Título no topo
          headerStyle: { backgroundColor: COLORS.surface }, // Fundo escuro
          headerTintColor: COLORS.textLight, // Cor da seta "Voltar"
          headerTitleStyle: { color: COLORS.textLight }, // Cor do título
        }}
      />
      {/* Garante que os ícones (bateria, wifi) fiquem brancos */}
      <StatusBar style="light" />

      {/* --- 1. Bloco de Informações --- */}
      {/* Mostra os dados que recebemos do Card */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title as string}</Text>
        <Text style={styles.infoText}>Professor: {professor as string}</Text>
        <Text style={styles.infoText}>Academia: {academia as string}</Text>
        <Text style={styles.infoText}>Duração: {duration as string}</Text>
      </View>

      {/* --- 2. Bloco do Calendário --- */}
      <Text style={styles.subtitle}>Selecione um dia disponível:</Text>
      <Calendar
        // Tema do calendário (cores escuras)
        theme={{
          calendarBackground: COLORS.surface,
          monthTextColor: COLORS.textLight,
          dayTextColor: COLORS.textLight,
          todayTextColor: COLORS.brandRed,
          selectedDayBackgroundColor: COLORS.brandRed,
          selectedDayTextColor: COLORS.textLight,
          arrowColor: COLORS.brandRed,
          textDisabledColor: '#555' // Cor dos dias de outros meses
        }}
        // Estilo do container do calendário
        style={styles.calendar}
        // Quando um dia é pressionado
        onDayPress={(day) => {
          setSelectedDay(day.dateString); // Salva o dia no 'useState'
        }}
        // Marca o dia selecionado
        markedDates={{
          // Pega o valor de 'selectedDay' e o usa como chave
          [selectedDay || '']: { selected: true, disableTouchEvent: true }
        }}
        // Define a data mínima (hoje) - não deixa agendar no passado
        minDate={new Date().toISOString().split('T')[0]} 
      />

      {/* --- 3. Bloco do Botão --- */}
      <Button
        mode="contained"
        // O botão SÓ é habilitado se 'selectedDay' não for nulo
        disabled={!selectedDay} 
        onPress={handleAgendar}
        style={styles.button}
        buttonColor={COLORS.brandRed}
      >
        Agendar Aula
      </Button>

    </View>
  );
}

// --- Estilos da Tela ---
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela toda
    backgroundColor: COLORS.background, // Fundo escuro
    padding: 20, // Espaçamento nas bordas
  },
  infoContainer: {
    backgroundColor: COLORS.surface, // Fundo do card de info
    padding: 16,
    borderRadius: 8,
    marginBottom: 20, // Espaço abaixo do card
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.textGray,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 16,
  },
  calendar: {
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 8, // Aumenta a altura do botão
  }
});