import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#f8fafc', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Catálogo de Filmes' }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ title: 'Detalhes do Filme' }}
        />
        <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{ title: 'Meus Favoritos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}