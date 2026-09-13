// src/screens/DetailsScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailsScreen({ route, navigation }) {
  const { filme } = route.params;

  const salvarFavorito = async () => {
    try {
      const favoritosSalvos = await AsyncStorage.getItem('@cinefatec_favoritos');
      let favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];

      const jaExiste = favoritos.some((f) => f.id === filme.id);

      if (jaExiste) {
        Alert.alert('Aviso', 'Este filme já está na sua lista de favoritos!');
        return;
      }

      favoritos.push(filme);
      await AsyncStorage.setItem('@cinefatec_favoritos', JSON.stringify(favoritos));

      Alert.alert('Sucesso', 'Filme adicionado aos favoritos!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o filme.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{filme.titulo}</Text>
      <Text style={styles.info}>Ano: {filme.ano}</Text>
      <Text style={styles.info}>Gênero: {filme.genero}</Text>
      <Text style={styles.info}>Diretor: {filme.diretor}</Text>
      <Text style={styles.info}>Duração: {filme.duracao}</Text>

      <Text style={styles.sectionHeader}>Sinopse:</Text>
      <Text style={styles.sinopse}>{filme.sinopse}</Text>

      <TouchableOpacity style={styles.customButton} onPress={salvarFavorito}>
        <Text style={styles.customButtonText}>Salvar nos Favoritos ❤️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#111' },
  info: { fontSize: 16, color: '#444', marginBottom: 4 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
  sinopse: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 24 },
  customButton: {
    backgroundColor: '#34C759',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  customButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});