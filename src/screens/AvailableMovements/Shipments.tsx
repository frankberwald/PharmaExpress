import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import NewMovementModal from "../../components/NewMovement";
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Movement } from '../../types/Interfaces';
import { useAuth } from '../../contexts/AuthContext';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>


export default function Movements() {
  const navigation = useNavigation<HomePageNavigationProp>();
  const { logout } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAddMovement = (movementData: Movement) => {
    setMovements((prevMovements) => [...prevMovements, movementData]);
  };
  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
    Alert.alert("Logout", "Você foi desconectado com sucesso.");
  }
  const goToStock = () => {
    navigation.navigate('ProductsScreen');
  };


  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await axios.get('http://10.0.0.113:3000/movements');
        setMovements(response.data);
      } catch (error) {
        Alert.alert("Erro ao buscar dados");
      } finally {
        setLoading(false);
      }
    };
    fetchMovements();
  }, []);

  const renderMovement = ({ item }: { item: Movement }) => {
    return (
      <View style={styles.movementCard}>
        <View style={styles.productInfo}>
          <Image source={{ uri: item.produto.imagem }} style={styles.productImage} />
          <Text style={styles.movementText}>{item.produto.nome}</Text>
        </View>
        <Text style={styles.movementText}>Quantidade: {item.quantidade} unidades</Text>
        <Text style={styles.movementText}>De: {item.origem.nome}</Text>
        <Text style={styles.movementText}>Para: {item.destino.nome}</Text>
        <Text style={styles.observationText}>Criado em: {new Date(item.dataCriacao).toLocaleDateString()} {new Date(item.dataCriacao).toLocaleTimeString()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <FlatList
          data={movements}
          renderItem={renderMovement}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <NewMovementModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onAddItem={handleAddMovement}
      />
      <TouchableOpacity onPress={handleOpenModal} style={styles.button}>
        <Text style={styles.buttonText}>Nova Movimentação</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToStock} style={styles.button}>
        <Text style={styles.buttonText}>Ver Produtos</Text>
      </TouchableOpacity>



      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.7}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF0F1',
    padding: 35,
  },
  button: {
    backgroundColor: '#9B1B30',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    margin: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
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
    width: 50,
    height: 50,
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
    elevation: 2,
  },
  logoutButtonText: {
    color: '#dc506c',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});
