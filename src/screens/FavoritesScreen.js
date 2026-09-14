import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@cineapp_favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const clearFavorites = async () => {
    try {
      await AsyncStorage.removeItem('@cineapp_favorites');
      setFavorites([]);
      Alert.alert('Sucesso', 'Lista de favoritos limpa!');
    } catch (error) {
      console.error(error);
    }
  };

  const removeIndividualFavorite = async (id) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      await AsyncStorage.setItem('@cineapp_favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>
        {favorites.length > 0
          ? `Total: ${favorites.length} filme(s) salvo(s)`
          : 'Sua lista de favoritos está vazia 🎬'}
      </Text>

      {favorites.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearFavorites}>
          <Text style={styles.clearButtonText}>🗑️ Limpar Todos</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardSubtitle}>{item.genero} • {item.ano}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeIndividualFavorite(item.id)}
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eef4fb',
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002244',
    textAlign: 'center',
    marginVertical: 12,
  },
  clearButton: {
    backgroundColor: '#d9534f', // Vermelho/suave para acao destrutiva
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#0056b3',
    elevation: 2,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20, // Título maior
    fontWeight: 'bold',
    color: '#002244',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#0056b3',
    marginTop: 2,
  },
  removeButton: {
    backgroundColor: '#4a90e2', // Azul intermediario para acao secundaria
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});