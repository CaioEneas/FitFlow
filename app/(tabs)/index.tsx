import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const texts = [
  'Tratamentos Faciais',
  'Tratamentos Corporais',
  'Tratamentos Capilares',
  'Podologia',
  'Bem-estar e Terapias Alternativas',
];

export default function HomeScreen() {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      });
    };

    animate();
  }, [index]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    marginBottom: 30,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  gradientText: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typingText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
});