// src/screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { buscarFilmes } from '../api';

export default function HomeScreen({ navigation }) {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const dados = await buscarFilmes();
        setFilmes(dados);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    }
    carregarFilmes();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('FavoritesScreen')}
      >
        <Text style={styles.favoritesButtonText}>Ver Meus Favoritos ⭐</Text>
      </TouchableOpacity>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetailsScreen', { filme: item })}
          >
            <Text style={styles.cardTitle}>{item.titulo} ({item.ano})</Text>
            <Text style={styles.cardSubtitle}>Gênero: {item.genero}</Text>
            <Text style={styles.cardDetail}>Direção: {item.diretor} • {item.duracao}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  favoritesButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  favoritesButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  cardDetail: { fontSize: 12, color: '#888', marginTop: 2 },
});