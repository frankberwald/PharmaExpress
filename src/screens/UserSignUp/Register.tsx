import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function Register() {
  const [profile, setProfile] = useState<string>('')
  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const resetForm = () => {
    setProfile('');
    setName('');
    setDocument('');
    setAddress('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleRegister = async () => {
    if (!profile || !name || !document || !address || !email || password !== confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos para continuar");
      return;
    }
    const now = new Date().toISOString();
    const userData = {
      profile,
      name,
      document,
      full_address: address,
      email,
      password,
      createdAt: now,
      updatedAt: now,
    };
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await axios.post('http://10.0.0.113:3000/register', userData);
        Alert.alert("Cadastro concluído com sucesso!");
        resetForm();
      } catch (error) {
        Alert.alert("Erro ao cadastrar usuário.");
        console.log(error);
        resetForm();
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  const isPasswordMatching = password === confirmPassword;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <MaterialCommunityIcons style={{ padding: 10 }} name="account-plus" size={32} color="black"><Text style={styles.title}>Formulário de cadastro</Text></MaterialCommunityIcons>

      <View style={styles.inputContainer}>
        <Picker
          selectedValue={profile}
          style={styles.picker}
          onValueChange={(itemValue: string) => setProfile(itemValue)}
        >
          <Picker.Item label="Selecione um perfil" value="" />
          <Picker.Item label="Motorista" value="motorista" />
          <Picker.Item label="Filial" value="filial" />
        </Picker>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder='Nome Completo'
        />
        <TextInput
          style={styles.input}
          onChangeText={setDocument}
          value={document}
          placeholder='Informe seu CPF/CNPJ'
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          value={address}
          placeholder='Endereço completo'
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder='Insira seu Email'
          keyboardType='email-address'
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { borderColor: confirmPassword ? (isPasswordMatching ? 'green' : '#9C1D33') : '#999' }]}
            onChangeText={setPassword}
            value={password}
            placeholder="Insira sua senha"
            secureTextEntry={!showPassword}
          />
          <TextInput
            style={[styles.input, { borderColor: confirmPassword ? (isPasswordMatching ? 'green' : '#9C1D33') : '#999' }]}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirme sua senha"
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
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF0F1',
    gap: 70
  },
  titleContainer: {

  },
  title: {
    fontSize: 24,
    bottom: 200
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
    bottom: 106,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  picker: {
    height: 50,
    width: 250,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    marginBottom: 10,
  },
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#9d232d',
    elevation: 2,
  }
});
