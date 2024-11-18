import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/Interfaces';
import { useAuth } from '../../contexts/AuthContext';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>

export default function HomePage() {

  const navigation = useNavigation<HomePageNavigationProp>();
  const { logout } = useAuth();

  const goToUsers = () => {
    navigation.navigate('UserScreen');
  };
  const goToStock = () => {
    navigation.navigate('ProductsScreen');
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
    Alert.alert("Logout", "Você foi desconectado com sucesso.");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.cardContainer}>
        <Header />

        <View style={styles.card}>
          <MaterialCommunityIcons name="account" size={40} color="#fff" style={styles.icon} />
          <Text style={styles.title}>Usuários</Text>
          <TouchableOpacity onPress={goToUsers} style={styles.manageButton} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Gerenciar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <MaterialCommunityIcons name="store" size={40} color="#fff" style={styles.icon} />
          <Text style={styles.title}>Estoque</Text>
          <TouchableOpacity onPress={goToStock} style={styles.manageButton} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Gerenciar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0F1',
    alignItems: 'center',
    paddingTop: 20
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    padding: 13,
    flex: 1
  },
  card: {
    width: 280,
    height: 180,
    backgroundColor: '#dc506c',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  manageButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    color: '#dc506c',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
});
