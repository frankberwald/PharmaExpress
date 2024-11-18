import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, FlatList, Image } from 'react-native';
import { Products } from '../../types/Interfaces';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

export default function ProductsScreen() {

  const [products, setProducts] = useState<Products[]>([])
  const [filtered, setFiltered] = useState<Products[]>([])
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://10.0.0.113:3000/products')
      .then((response) => {
        setProducts(response.data)
        setFiltered(response.data)
        console.log(response.data)
      })
      .catch(() => {
        Alert.alert("Não foi possível se conectar a base de dados")
      })
  }, [])

  useEffect(() => {
    if (search === '') {
      console.log(search)
      setFiltered(products);
    } else {
      const filteredResults = products.filter(item =>
        item.product_name && item.product_name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(filteredResults);
      console.log(filtered)
    }
  }, [search, products]);

  const renderProducts = ({ item }: { item: Products }) => {
    return (
      <View style={styles.productContainer}>
        <View style={styles.productCard}>
          <Text style={styles.productName}>{item.product_name}</Text>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Image
              source={{ uri: item.image_url }}
              style={styles.productImage}
            />
            <Text style={styles.quantity}>{item.quantity} Unidades disponíveis</Text>

          </View>
          <Text style={styles.productDetails}>{item.description}</Text>
          <Text>Localizado em:{item.branch_name}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="warehouse" color="#000" style={styles.pageTitle} ><Text>Lista de produtos em estoque.</Text></MaterialCommunityIcons>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Filtrar produtos...'
          style={styles.filterInput}
          onChangeText={setSearch}
          value={search}
        />
        <MaterialCommunityIcons name="magnify" color="#000" size={25} style={styles.searchIcon} />
      </View>
      <FlatList
        data={filtered}
        renderItem={renderProducts}
      />
      <StatusBar style="dark"{...{ backgroundColor: '#fff', }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF0F1',
    gap: 15,
    marginTop: 15
  },
  pageTitle: {
    fontSize: 24,
    top: 15,
    marginBottom: 10,
    color: '#000',
    margin: 5
  },
  productContainer: {
    padding: 5,
    width: '100%',
    alignItems: 'center',
  },
  productCard: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 5,
    borderLeftColor: '#9B1B30',
    width: 320,
    height: 270,
    backgroundColor: '#FCF5E8',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productName: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    bottom: 12
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 15
  },
  productDetails: {
    padding: 5
  },
  quantity: {
    fontSize: 14,
    color: '#7CB518',
    marginLeft: 5
  },
  filterInput: {
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#fff',
    width: 350,
    height: 35,
    paddingLeft: 20,
    paddingBottom: 5,
    borderRadius: 10,
  },
  searchContainer: {
    position: 'relative',
    width: 350,
    height: 35,
    marginBottom: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 5,
  },
  manageButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#dc506c',
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
