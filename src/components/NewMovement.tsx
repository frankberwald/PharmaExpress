import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Branches, Products, NewMovementModalProps } from '../types/Interfaces';
import axios from 'axios';


export default function NewMovementModal({ visible, onClose, onAddItem }: NewMovementModalProps) {

  const [branches, setBranches] = useState<Branches[]>([])
  const [products, setProducts] = useState<Products[]>([])
  const [quantity, setQuantity] = useState('');
  const [product_id, setProductId] = useState('');
  const [branchOrigem, setBranchOrigem] = useState('');
  const [branchDestino, setBranchDestino] = useState('');
  const [observations, setObservations] = useState('');


  useEffect(() => {
    axios.get('http://10.0.0.113:3000/branches/options')
      .then((response) => {
        setBranches(response.data)
      })
      .catch(() => {
        Alert.alert("Não foi possível se conectar a base de dados")
      })
  }, [])

  useEffect(() => {
    axios.get('http://10.0.0.113:3000/products/options')
      .then((response) => {
        setProducts(response.data)
      })
      .catch(() => {
        Alert.alert("Não foi possível se conectar a base de dados")
      })
  }, [])

  const handleMovement = async () => {
    if (!quantity || !branchOrigem || !branchDestino || !product_id) {
      Alert.alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    console.log(branchOrigem)
    const movementData = {
      quantity: quantity,
      destinationBranchId: branchDestino,
      originBranchId: branchOrigem,
      productId: product_id,
      observations
    }
    console.log(movementData)
    try {
      const response = await axios.post('http://10.0.0.113:3000/movements', movementData);

      if (response.status === 201) {
        Alert.alert("Movimentação cadastrada com sucesso.");
        onAddItem(response.data);
        onClose();
      }
    } catch (error) {
      console.error("Erro ao cadastrar movimentação:", error);
      Alert.alert("Erro ao cadastrar movimentação. Tente novamente.");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Nova Movimentação</Text>

        <Text style={styles.label}>Selecione a Filial de Origem:{branchOrigem}</Text>
        <Picker
          selectedValue={branchOrigem}
          onValueChange={(itemValue) => setBranchOrigem(itemValue)}
          style={styles.picker}
        >
          {branches.map((branch) => (
            <Picker.Item label={branch.name} value={branch.id} key={branch.id} />
          ))}
        </Picker>

        <Text style={styles.label}>Selecione a Filial de Destino:{branchDestino}</Text>
        <Picker
          selectedValue={branchDestino}
          onValueChange={(itemValue) => setBranchDestino(itemValue)}
          style={styles.picker}
        >
          {branches.map((branch) => (
            <Picker.Item label={branch.name} value={branch.id} key={branch.id} />
          ))}
        </Picker>

        <Text style={styles.label}>Selecione o Produto:</Text>
        <Picker
          selectedValue={product_id}
          onValueChange={(itemValue) => setProductId(itemValue)}
          style={styles.picker}
        >
          {products.map((product) => (
            <Picker.Item label={product.product_name} value={product.product_id} key={product.product_id} />
          ))}
        </Picker>

        <Text style={styles.label}>Quantidade:</Text>
        <TextInput
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Digite a quantidade"
          style={styles.input}
        />
        <Text style={styles.label}>Observações:</Text>
        <TextInput
          value={observations}
          onChangeText={setObservations}
          placeholder="Digite suas observações aqui..."
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          maxLength={200}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleMovement} style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar Movimentação</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={[styles.button, styles.closeButton]}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 30,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


// { visible, onClose, onAddItem }