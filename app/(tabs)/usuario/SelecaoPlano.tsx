import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Importamos a lógica que criamos no arquivo Planos.ts
import { PagamentoPix, PagamentoCartao, finalizarCompra } from './Planos';

const FITFLOW_COLORS = {
  background: '#1C1C1E',
  surface: '#2C2C2E',
  brandRed: '#E63946',
  textLight: '#FFFFFF',
  textGray: '#8A8A8E',
  success: '#2ecc71'
};

export default function SelecaoPlanoScreen() {
  const navigation = useNavigation();
  
  // --- MEMÓRIA DA TELA (Estados) ---
  // Guarda qual plano (mensal/semestral) e qual pagamento (pix/cartao) o usuário clicou
  const [planoSelecionado, setPlanoSelecionado] = useState<'mensal' | 'semestral'>('mensal');
  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'cartao'>('pix');
  const [loading, setLoading] = useState(false); // Para mostrar a rodinha girando

  // Preços fixos
  const VALOR_MENSAL = 100.00;
  const VALOR_SEMESTRAL = 500.00;

  // Função que roda quando clica em "Confirmar Pagamento"
  const handleConfirmarPagamento = () => {
    setLoading(true); // Trava o botão e mostra carregando

    // 1. Descobre o valor com base na escolha do usuário
    const valor = planoSelecionado === 'mensal' ? VALOR_MENSAL : VALOR_SEMESTRAL;

    // 2. Cria o "Objeto" certo (Pix ou Cartão) dependendo da escolha
    let metodo;
    if (metodoPagamento === 'pix') {
      metodo = new PagamentoPix(); // Cria um "robô" especialista em Pix
    } else {
      metodo = new PagamentoCartao(); // Cria um "robô" especialista em Cartão
    }

    // Espera 1.5 segundos para fingir que está processando (simulação)
    setTimeout(() => {
      // 3. Mágica do Polimorfismo:
      // Chamamos a função genérica passando o "robô" específico que criamos acima.
      const resultado = finalizarCompra(metodo, valor);
      
      setLoading(false); // Destrava o botão

      // Mostra o alerta na tela com a mensagem que veio do arquivo Planos.ts
      Alert.alert(
        'Pagamento Processado',
        resultado,
        [
          { text: 'OK', onPress: () => navigation.goBack() } // Volta para o perfil ao clicar em OK
        ]
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.title}>Escolha seu Plano</Text>

        {/* --- BOTÃO: PLANO MENSAL --- */}
        <TouchableOpacity 
          style={[styles.card, planoSelecionado === 'mensal' && styles.cardSelected]} // Muda cor se selecionado
          onPress={() => setPlanoSelecionado('mensal')}
        >
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={24} color={FITFLOW_COLORS.textLight} />
            <View style={styles.textGroup}>
              <Text style={styles.cardTitle}>Plano Mensal</Text>
              <Text style={styles.cardDesc}>Acesso total por 30 dias</Text>
            </View>
            <Text style={styles.price}>R$ {VALOR_MENSAL.toFixed(2)}</Text>
            {/* Bolinha de seleção */}
            <RadioButton 
              value="mensal" 
              status={planoSelecionado === 'mensal' ? 'checked' : 'unchecked'} 
              onPress={() => setPlanoSelecionado('mensal')}
              color={FITFLOW_COLORS.brandRed}
            />
          </View>
        </TouchableOpacity>

        {/* PLANO SEMESTRAL */}
        <TouchableOpacity 
          style={[styles.card, planoSelecionado === 'semestral' && styles.cardSelected]}
          onPress={() => setPlanoSelecionado('semestral')}
        >
          <View style={styles.row}>
            <Ionicons name="trophy-outline" size={24} color="#FFD700" />
            <View style={styles.textGroup}>
              <Text style={styles.cardTitle}>Plano Semestral</Text>
              <Text style={styles.cardDesc}>Economize e treine por 6 meses</Text>
            </View>
            <Text style={styles.price}>R$ {VALOR_SEMESTRAL.toFixed(2)}</Text>
            <RadioButton 
              value="semestral" 
              status={planoSelecionado === 'semestral' ? 'checked' : 'unchecked'} 
              onPress={() => setPlanoSelecionado('semestral')}
              color={FITFLOW_COLORS.brandRed}
            />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Forma de Pagamento</Text>

        {/* --- BOTÕES DE PAGAMENTO (Pix e Cartão lado a lado) --- */}
        <View style={styles.paymentContainer}>
          
          {/* Botão PIX */}
          <TouchableOpacity 
            style={[styles.paymentOption, metodoPagamento === 'pix' && styles.paymentSelected]}
            onPress={() => setMetodoPagamento('pix')}
          >
            <Ionicons name="flash" size={30} color={metodoPagamento === 'pix' ? FITFLOW_COLORS.brandRed : FITFLOW_COLORS.textGray} />
            <Text style={[styles.paymentText, metodoPagamento === 'pix' && styles.textSelected]}>Pix</Text>
          </TouchableOpacity>

          {/* Botão CARTÃO */}
          <TouchableOpacity 
            style={[styles.paymentOption, metodoPagamento === 'cartao' && styles.paymentSelected]}
            onPress={() => setMetodoPagamento('cartao')}
          >
            <Ionicons name="card" size={30} color={metodoPagamento === 'cartao' ? FITFLOW_COLORS.brandRed : FITFLOW_COLORS.textGray} />
            <Text style={[styles.paymentText, metodoPagamento === 'cartao' && styles.textSelected]}>Cartão</Text>
          </TouchableOpacity>
        </View>

        {/* --- RODAPÉ COM TOTAL E BOTÃO FINAL --- */}
        <View style={styles.footer}>
          <Text style={styles.totalText}>
            Total: <Text style={styles.totalValue}>R$ {planoSelecionado === 'mensal' ? VALOR_MENSAL.toFixed(2) : VALOR_SEMESTRAL.toFixed(2)}</Text>
          </Text>
          
          <Button 
            mode="contained" 
            onPress={handleConfirmarPagamento} // Chama a função lá de cima
            loading={loading}
            disabled={loading}
            style={styles.payButton}
            labelStyle={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}
            icon="check-circle-outline"
          >
            Confirmar Pagamento
          </Button>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: FITFLOW_COLORS.background },
  scrollContent: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: FITFLOW_COLORS.textLight, marginBottom: 20, marginTop: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: FITFLOW_COLORS.textLight, marginTop: 30, marginBottom: 15 },
  
  card: {
    backgroundColor: FITFLOW_COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: FITFLOW_COLORS.brandRed, // Borda vermelha quando selecionado
    backgroundColor: '#3a2022', // Fundo levemente avermelhado
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textGroup: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: FITFLOW_COLORS.textLight },
  cardDesc: { fontSize: 12, color: FITFLOW_COLORS.textGray },
  price: { fontSize: 16, fontWeight: 'bold', color: FITFLOW_COLORS.success, marginRight: 10 },
  
  paymentContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  paymentOption: {
    flex: 1,
    backgroundColor: FITFLOW_COLORS.surface,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  paymentSelected: {
    borderColor: FITFLOW_COLORS.brandRed,
    borderWidth: 2,
  },
  paymentText: { marginTop: 10, color: FITFLOW_COLORS.textGray, fontWeight: '600' },
  textSelected: { color: FITFLOW_COLORS.textLight },

  footer: { marginTop: 40, borderTopWidth: 1, borderTopColor: '#333', paddingTop: 20 },
  totalText: { fontSize: 18, color: FITFLOW_COLORS.textGray, textAlign: 'right', marginBottom: 15 },
  totalValue: { fontSize: 24, color: FITFLOW_COLORS.textLight, fontWeight: 'bold' },
  payButton: { backgroundColor: FITFLOW_COLORS.brandRed, paddingVertical: 8, borderRadius: 8 },
});