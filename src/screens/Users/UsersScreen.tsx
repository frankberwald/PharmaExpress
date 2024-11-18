import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, FlatList, Switch, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from '../../types/Interfaces';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>

export default function UserScreen() {

  const navigation = useNavigation<HomePageNavigationProp>();

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    axios.get('http://10.0.0.113:3000/users')
      .then((response) => {
        setUsers(response.data)
        console.log(response.data)
      })
      .catch(() => {
        Alert.alert("Não foi possível se conectar a base de dados")
      })
  }, [])

  const toggleSwitch = async (item: User) => {
    const updatedStatus = !item.status;
    try {
      await axios.patch(`http://10.0.0.113:3000/users/${item.id}/toggle-status`, { status: updatedStatus });
      setUsers(
        users.map((user) => {
          if (Number(user.id) === Number(item.id)) {
            return { ...user, status: !user.status }
          }
          return user
        })
      );
    } catch (error) {
      Alert.alert("Erro ao atualizar o status do usuário.");
      console.log(error);
    }
  };

  const renderUser = ({ item }: { item: User }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.whiteText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
          <Text style={styles.whiteText} numberOfLines={1} ellipsizeMode="tail">Perfil:{item.profile}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.userStatus}>Status: {item.status ? 'Ativo' : 'Inativo'}</Text>
            <Switch
              trackColor={{ false: "#000", true: "#26cc00" }}
              thumbColor={item.status ? "#26cc00" : "#9d232d"}
              ios_backgroundColor="#000"
              onValueChange={() => toggleSwitch(item)}
              value={item.status}
            />
          </View>
          <Text style={styles.userAddress}>{item.full_address}</Text>
        </View>
      </View>

    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUser}
        numColumns={2}
        keyExtractor={(item) => item.profile.toString()}
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={goToRegister}
      >
        <Text style={styles.buttonText}>Cadastrar Usuário</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0F1',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30
  },
  cardContainer: {
    padding: 10,
  },
  card: {
    width: 170,
    height: 180,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    borderLeftWidth: 5,
    borderLeftColor: '#9B1B30'
  },
  whiteText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  userStatus: {
    color: '#000',
    fontSize: 14,
  },
  userAddress: {
    color: '#000',
    fontSize: 12,
    marginTop: 5,
  },
  registerButton: {
    borderWidth: 1,
    backgroundColor: '#9B1B30',
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
    width: 200,
    maxWidth: 220,
    borderColor: '#9B1B30',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FDF0F1',
    fontSize: 18,
    textAlign: 'center',
  },
});
