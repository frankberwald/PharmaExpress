import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/Interfaces';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>

export default function Login() {

  const navigation = useNavigation<HomePageNavigationProp>();

  const goToHome = () => {
    navigation.navigate('UserScreen');
  };

  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        goToHome();
      }
    };
    checkLogin();
  }, [navigation])

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      await AsyncStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      Alert.alert("Erro", "Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Image
        style={styles.logo}
        source={require('../../../assets/logo2.png')}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder='Insira seu Email'
          keyboardType='email-address'
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Insira sua senha"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="black"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9F3',
  },
  logo: {
    width: 393,
    height: '45%',
    position: 'relative',
    bottom: 90
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50
  },
  input: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'relative',
    left: 315,
    bottom: 48,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#9d232d',
    elevation: 2,
  }
});
