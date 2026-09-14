import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailsScreen({ route }) {
  const { movie } = route.params;

  const saveFavorite = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('@cineapp_favorites');
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      const isAlreadyFavorite = favorites.some((item) => item.id === movie.id);

      if (isAlreadyFavorite) {
        Alert.alert('Aviso', 'Este filme já está na sua lista de favoritos!');
        return;
      }

      favorites.push(movie);
      await AsyncStorage.setItem('@cineapp_favorites', JSON.stringify(favorites));
      Alert.alert('Sucesso', 'Filme adicionado aos favoritos!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar o filme.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsCard}>
        <Text style={styles.title}>{movie.titulo}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Gênero:</Text>
          <Text style={styles.value}>{movie.genero}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Ano:</Text>
          <Text style={styles.value}>{movie.ano}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Diretor:</Text>
          <Text style={styles.value}>{movie.diretor}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Duração:</Text>
          <Text style={styles.value}>{movie.duracao}</Text>
        </View>

        <Text style={styles.synopsisTitle}>Sinopse:</Text>
        <Text style={styles.synopsis}>{movie.sinopse}</Text>
      </View>

      <TouchableOpacity style={styles.customButton} onPress={saveFavorite}>
        <Text style={styles.customButtonText}>💙 Adicionar aos Favoritos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eef4fb',
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  title: {
    fontSize: 26, // Título principal maior
    fontWeight: 'bold',
    color: '#002244',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#d0e1f9',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0056b3',
    width: 80,
  },
  value: {
    fontSize: 16,
    color: '#1a365d',
    flex: 1,
  },
  synopsisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002244',
    marginTop: 12,
    marginBottom: 4,
  },
  synopsis: {
    fontSize: 15,
    color: '#4a6572',
    lineHeight: 22,
  },
  customButton: {
    backgroundColor: '#0056b3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  customButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});