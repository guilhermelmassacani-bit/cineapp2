import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { fetchMovies } from '../api';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies()
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0056b3" />
        <Text style={styles.loadingText}>Carregando catálogo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('FavoritesScreen')}
      >
        <Text style={styles.favoritesButtonText}>⭐ Ver Meus Favoritos</Text>
      </TouchableOpacity>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DetailsScreen', { movie: item })}
          >
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardSubtitle}>
              {item.genero} • {item.ano}
            </Text>
            <Text style={styles.cardDetail}>Direção: {item.diretor}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eef4fb', // Azul muito suave para o fundo
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef4fb',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#003366',
    fontWeight: '500',
  },
  favoritesButton: {
    backgroundColor: '#0056b3', // Azul escuro vibrante
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para Web/iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  favoritesButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff', // Destaque em azul no lado esquerdo
    elevation: 2,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 22, // Título maior
    fontWeight: 'bold',
    color: '#002244', // Azul escuro para leitura
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#0056b3',
    marginTop: 4,
    fontWeight: '600',
  },
  cardDetail: {
    fontSize: 14,
    color: '#4a6572',
    marginTop: 4,
  },
});