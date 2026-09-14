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
        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={limparFavoritos}
          activeOpacity={0.8}
        >
          <Text style={styles.clearButtonText}>Limpar Todos os Favoritos 🗑️</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardSubtitle}>{item.genero} • {item.ano}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removerFavoritoIndividual(item.id)}
              activeOpacity={0.7}
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
    backgroundColor: '#0f172a' 
  },
  counterText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    color: '#f8fafc',
    textAlign: 'center'
  },
  clearButton: {
    backgroundColor: '#ef4444', 
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  clearButtonText: { 
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 2,
  },
  infoContainer: { 
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#f8fafc' 
  },
  cardSubtitle: { 
    fontSize: 14, 
    color: '#38bdf8',
    marginTop: 4 
  },
  removeButton: {
    backgroundColor: '#dc2626', 
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  removeButtonText: { 
    color: '#ffffff', 
    fontSize: 13, 
    fontWeight: 'bold' 
  },
});