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
        <ActivityIndicator size="large" color="#38bdf8" />
        <Text style={styles.loadingText}>Carregando catálogo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('FavoritesScreen')}
        activeOpacity={0.8}
      >
        <Text style={styles.favoritesButtonText}>VER MEUS FAVORITOS ⭐</Text>
      </TouchableOpacity>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('DetailsScreen', { filme: item })}
          >
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardYear}>({item.ano})</Text>
            <Text style={styles.cardSubtitle}>Gênero: {item.genero}</Text>
            <Text style={styles.cardDetail}>Direção: {item.diretor} • {item.duracao}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a',
  },
  centerContainer: {
    flex: 1,
    justify: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 18,
    color: '#94a3b8',
    fontWeight: '600',
    textAlign: 'center',
  },
  favoritesButton: {
    backgroundColor: '#0284c7',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 24,
    alignItems: 'center',
    justify: 'center',
    shadowColor: '#0284c7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  favoritesButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 22,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 2,
  },
  cardYear: {
    fontSize: 15,
    fontWeight: '600',
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#38bdf8',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
  cardDetail: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
  },
});