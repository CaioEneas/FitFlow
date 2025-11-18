/* --- app/(tabs)/home/ClassCard.tsx --- */
/* (Versão ATUALIZADA - Agora é clicável e navega) */

import React from 'react';
import { View, Text, ImageBackground, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles/ClassCardStyles';

// --- Importar o 'useRouter' para navegação ---
import { useRouter } from 'expo-router';

const COLORS = { infoIcon: '#f0f0f0ff' };

type ClassCardProps = {
  image: ImageSourcePropType;
  title: string;
  duration: string;
  professor: string;
  academia: string;
  // --- Passar um ID (ou dados completos) ---
  // Vamos simplificar e passar todos os dados como strings
};

export default function ClassCard(props: ClassCardProps) {
  // Desestrutura as props para facilitar o uso
  const { image, title, duration, professor, academia } = props;

  // --- Inicializar o hook de navegação ---
  const router = useRouter();

  // --- Função para navegar ---
  const handleCardPress = () => {
    // Navega para a tela 'classDetails'
    router.push({
      pathname: '/classDetails',
      // 'params' envia os dados para a próxima tela
      params: { 
        // Não podemos passar 'image' (require), então passaremos o resto
        title,
        duration,
        professor,
        academia
        // (Nota: No app real, passaríamos um 'classId' e buscaríamos
        // os dados na API, mas por agora isso funciona)
      }
    });
  };

  return (
    // --- Envolvemos tudo em um 'TouchableOpacity' ---
    <TouchableOpacity onPress={handleCardPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.imageBackground}>
          <LinearGradient
            colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.9)']}
            style={styles.gradient}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={16} color={COLORS.infoIcon} style={styles.icon} />
              <Text style={styles.infoText}>{professor}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color={COLORS.infoIcon} style={styles.icon} />
              <Text style={styles.infoText}>{academia}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={16} color={COLORS.infoIcon} style={styles.icon} />
              <Text style={styles.infoText}>{duration}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}