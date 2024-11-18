import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { LocationType } from '../../types/Interfaces';
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/Interfaces';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>
type MapViewRouteProp = RouteProp<{ MapView: { origem: LocationType; destino: LocationType } }, 'MapView'>;

export default function MapViewComponent({ route }: { route: MapViewRouteProp }) {

  const navigation = useNavigation<HomePageNavigationProp>();
  const goBack = () => {
    navigation.navigate('ShipmentsList')
  }
  const { origem, destino } = route.params;
  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (origem && destino) {
      const centerLat = (origem.latitude);
      const centerLng = (origem.longitude);
      const newRegion = {
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      console.log('New region:', newRegion);
      setRegion(newRegion);
      setLoading(false);
    }
  }, [origem, destino]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
        >
          <Marker coordinate={{ latitude: origem.latitude, longitude: origem.longitude }} title="Origem" />
          <Marker coordinate={{ latitude: destino.latitude, longitude: destino.longitude }} title="Destino" />
        </MapView>
      )}

      <View>
        <TouchableOpacity onPress={goBack} style={styles.goBackButton}><Text style={styles.goBackText}>Voltar</Text></TouchableOpacity>
      </View>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0F1',
    alignItems: 'center',
    paddingTop: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  goBackText: {
    color: '#dc506c',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  goBackButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#Fff',
    borderRadius: 20,
    marginBottom: 20,
    position: 'relative',
    elevation: 2,
  }
});