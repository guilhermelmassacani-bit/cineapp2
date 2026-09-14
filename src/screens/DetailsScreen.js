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
      
      <View style={styles.infoCard}>
        <Text style={styles.info}>📅 <Text style={styles.infoBold}>Ano:</Text> {filme.ano}</Text>
        <Text style={styles.info}>🎬 <Text style={styles.infoBold}>Gênero:</Text> {filme.genero}</Text>
        <Text style={styles.info}>🎥 <Text style={styles.infoBold}>Diretor:</Text> {filme.diretor}</Text>
        <Text style={styles.info}>⏱️ <Text style={styles.infoBold}>Duração:</Text> {filme.duracao}</Text>
      </View>

      <Text style={styles.sectionHeader}>Sinopse</Text>
      <Text style={styles.sinopse}>{filme.sinopse}</Text>

      <TouchableOpacity 
        style={styles.customButton} 
        onPress={salvarFavorito}
        activeOpacity={0.8}
      >
        <Text style={styles.customButtonText}>Salvar nos Favoritos 🤍</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#0f172a',
    justifyContent: 'center', 
    alignItems: 'center',   
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#f8fafc',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
    width: '100%',
    alignItems: 'center', 
  },
  info: { 
    fontSize: 18, 
    color: '#cbd5e1', 
    marginBottom: 8,
    textAlign: 'center',
  },
  infoBold: {
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  sectionHeader: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginTop: 8, 
    marginBottom: 8,
    color: '#f8fafc',
    textAlign: 'center',
  },
  sinopse: { 
    fontSize: 18, 
    color: '#94a3b8', 
    lineHeight: 26, 
    marginBottom: 30,
    textAlign: 'center',
  },
  customButton: {
    backgroundColor: '#2563eb', 
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  customButtonText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});