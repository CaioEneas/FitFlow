/* --- app/(tabs)/agendamento/MeusAgendamentos.tsx --- */
/* (Arquivo NOVO - A tela "Meus Agendamentos" do usuário) */

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles/MeusAgendamentosStyles';

// --- Nosso "Banco de Dados Falso" ---
const AGENDAMENTOS_MOCK = [
  {
    id: '1',
    mes: 'NOV',
    dia: '20',
    aula: 'Boxe',
    professor: 'João Silva',
    academia: 'Kakureco Fight',
    horario: '20:00',
  },
  {
    id: '2',
    mes: 'NOV',
    dia: '22',
    aula: 'Pilates',
    professor: 'Ana Clara',
    academia: 'Estúdio Equilíbrio',
    horario: '08:00',
  },
  {
    id: '3',
    mes: 'NOV',
    dia: '23',
    aula: 'Jiu-Jitsu',
    professor: 'Mestre Carlos',
    academia: 'Kakureko Fight',
    horario: '10:00',
  },
  {
    id: '4',
    mes: 'NOV',
    dia: '25',
    aula: 'CrossFit',
    professor: 'Coach Breno',
    academia: 'CT Calango',
    horario: '17:00',
  },
];

// Interface para definir o tipo de cada item
interface Agendamento {
  id: string;
  mes: string;
  dia: string;
  aula: string;
  professor: string;
  academia: string;
  horario?: string;
}

// --- Componente da Tela ---
export default function MeusAgendamentosScreen() {
  
  // Criamos um estado para a lista, para que ela possa ser alterada
  const [agendamentos, setAgendamentos] = useState(AGENDAMENTOS_MOCK);

  // Função para "cancelar" um agendamento (remove da lista)
  const handleCancel = (id: string, aula: string) => {
    Alert.alert(
      "Cancelar Agendamento",
      `Tem certeza que deseja cancelar a aula de ${aula}?`,
      [
        // Botão "Não" (não faz nada)
        { text: "Não", style: "cancel" },
        // Botão "Sim" (filtra a lista)
        { 
          text: "Sim", 
          onPress: () => {
            // Cria uma nova lista sem o item com o ID clicado
            setAgendamentos(prev => prev.filter(item => item.id !== id));
          },
          style: 'destructive'
        }
      ]
    );
  };

  // --- Componente de Card (Renderiza 1 item da lista) ---
  const renderAgendamento = ({ item }: { item: Agendamento }) => (
    <View style={styles.card}>
      {/* Caixa da Data */}
      <View style={styles.dateBox}>
        <Text style={styles.dateMonth}>{item.mes}</Text>
        <Text style={styles.dateDay}>{item.dia}</Text>
      </View>
      
      {/* Infos da Aula */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle} numberOfLines={1}>{item.aula}</Text>
        <Text style={styles.infoText}>Prof. {item.professor}</Text>
        <Text style={styles.infoText}>{item.academia} • {item.horario}</Text>

        {/* Botão de Cancelar */}
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => handleCancel(item.id, item.aula)}
        >
          <Text style={styles.cancelButtonText}>CANCELAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Componente de "Lista Vazia" ---
  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Ionicons name="calendar-outline" size={60} color={styles.emptyStateText.color} />
      <Text style={styles.emptyStateText}>Você não possui agendamentos.</Text>
      <Text style={[styles.emptyStateText, { fontSize: 14, marginTop: 5 }]}>
        Explore a tela Home para agendar!
      </Text>
    </View>
  );

  // --- Renderização Principal ---
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Meus Agendamentos</Text>

      <FlatList
        data={agendamentos} // A lista de dados
        renderItem={renderAgendamento} // A função que desenha cada item
        keyExtractor={(item) => item.id} // Como o React identifica cada item
        contentContainerStyle={{ paddingBottom: 100 }} // Espaço no final
        ListEmptyComponent={renderEmptyState} // O que mostrar se a lista estiver vazia
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}