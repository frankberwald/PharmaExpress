import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, Image, Button, TouchableOpacity } from 'react-native'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Movement } from '../../types/Interfaces';
import { useAuth } from '../../contexts/AuthContext';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>


export default function ShipmentsList() {
  const navigation = useNavigation<HomePageNavigationProp>();

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
    Alert.alert("Logout", "Você foi desconectado com sucesso.");
  }
  const seeMap = (origem: { latitude: number; longitude: number }, destino: { latitude: number; longitude: number }) => {
    navigation.navigate('MapView', {
      origem: { ...origem, route: 'Origem' },
      destino: { ...destino, route: 'Destino' }
    });
  };

  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout, user } = useAuth();

  const fetchMovements = async () => {
    try {
      const response = await axios.get('http://10.0.0.113:3000/movements');
      setMovements(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Falha ao carregar dados.')
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovements();
  }, [])

  const startDelivery = async (movementId: string) => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permissão de câmera necessária!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync();
      if (result.canceled || !result.assets?.length) return;

      const formData = new FormData();
      formData.append('file', {
        uri: result.assets[0].uri,
        name: 'file.jpg',
        type: 'image/jpeg',
      } as any);

      for (let part of (formData as any).getParts()) {
        console.log(`${part.fieldName}:`, part);
      }

      formData.append('motorista', user?.name || 'motorista');

      try {
        await axios.put(`http://10.0.0.113:3000/movements/${movementId}/start`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMovements(movements => movements.map(movement =>
          movement.id === movementId ? { ...movement, status: 'em transito' } : movement
        ));
        Alert.alert('Entrega iniciada com sucesso!');
        fetchMovements();
      } catch (error) {
        console.error(error);
        Alert.alert('Erro ao iniciar entrega.');
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão ou capturar imagem:", error);
      Alert.alert('Erro ao acessar a câmera.');
    }
  };

  const finishDelivery = async (movementId: string) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão de câmera necessária!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (result.canceled || !result.assets?.length) return;

    const formData = new FormData();
    formData.append('file', {
      uri: result.assets[0].uri,
      name: 'file.jpg',
      type: 'image/jpeg',
    } as any);
    formData.append('motorista', user?.name || 'motorista');

    try {
      await axios.put(`http://10.0.0.113:3000/movements/${movementId}/end`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMovements(movements => movements.map(movement =>
        movement.id === movementId ? { ...movement, status: 'Coleta finalizada' } : movement
      ));
      Alert.alert('Entrega finalizada com sucesso!');
      fetchMovements();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao finalizar entrega.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  const renderItem = ({ item }: { item: Movement }) => {
    return (
      <View style={styles.movementCard}>
        <View style={styles.productInfo}>
          <Image source={{ uri: item.produto.imagem }} style={styles.productImage} />
          <View>
            <Text style={styles.movementText}>Produto: {item.produto.nome}</Text>
            <Text style={styles.observationText}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.observationText}>Origem: {item.origem.nome}</Text>
            <Text style={styles.observationText}>Destino: {item.destino.nome}</Text>
            <Text style={styles.observationText}>Status: {item.status}</Text>
          </View>
        </View>
        {item.status === 'created' && (
          <TouchableOpacity style={styles.button} onPress={() => startDelivery(item.id)}>
            <Text style={styles.buttonText}>Iniciar Entrega</Text>
          </TouchableOpacity>
        )}
        {item.status === 'em transito' && (
          <>
            <TouchableOpacity style={styles.button} onPress={() => finishDelivery(item.id)}>
              <Text style={styles.buttonText}>Finalizar Entrega</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => seeMap(item.origem, item.destino)}>
              <Text style={styles.buttonText}>Ver Mapa</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === 'Coleta finalizada' && (
          <>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Entrega Concluida</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entregas disponíveis</Text>
      <StatusBar style='auto' />
      <FlatList
        data={movements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.7}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF0F1',
    padding: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20
  },
  button: {
    backgroundColor: '#9B1B30',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  movementCard: {
    backgroundColor: '#FFE5E8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: 300,
    borderLeftWidth: 5,
    borderLeftColor: '#9B1B30',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  movementText: {
    color: '#9B1B30',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  observationText: {
    color: '#4A4A4A',
    fontSize: 14,
    fontStyle: 'italic',
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#Fff',
    borderRadius: 20,
    marginBottom: 20,
    position: 'relative',
    elevation: 2
  },
  logoutButtonText: {
    color: '#dc506c',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});