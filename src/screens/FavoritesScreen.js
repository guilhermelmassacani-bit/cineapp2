// src/screens/FavoritesScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState([]);

  const carregarFavoritos = async () => {
    try {
      const dados = await AsyncStorage.getItem('@cinefatec_favoritos');
      if (dados) {
        setFavoritos(JSON.parse(dados));
      } else {
        setFavoritos([]);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const limparFavoritos = async () => {
    try {
      await AsyncStorage.removeItem('@cinefatec_favoritos');
      setFavoritos([]);
      Alert.alert('Sucesso', 'Todos os favoritos foram removidos.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível limpar os favoritos.');
    }
  };

  const removerFavoritoIndividual = async (id) => {
    try {
      const novaLista = favoritos.filter((item) => item.id !== id);
      await AsyncStorage.setItem('@cinefatec_favoritos', JSON.stringify(novaLista));
      setFavoritos(novaLista);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o item.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>
        {favoritos.length > 0
          ? `Total: ${favoritos.length} filme(s) salvo(s)`
          : 'Sua lista de favoritos está vazia 🎬'}
      </Text>

      {favoritos.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={limparFavoritos}>
          <Text style={styles.clearButtonText}>Limpar Todos os Favoritos 🗑️</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardSubtitle}>{item.genero} • {item.ano}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removerFavoritoIndividual(item.id)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  counterText: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  clearButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  infoContainer: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 13, color: '#666', marginTop: 2 },
  removeButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});