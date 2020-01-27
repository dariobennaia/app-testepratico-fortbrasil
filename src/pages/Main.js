import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main({ navigation }) {
    const [shops, setShops] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [name, setName] = useState('');

    function handleRegionChange(region) {
      setCurrentRegion(region);
      loadShops();
    }

    async function loadShops() {
      const { latitude, longitude } = currentRegion;
      const { data } = await api.get('/shops/mobile/distance-of/2000', {
        params: {
          latitude,
          longitude,
          name: name
        }
      });
      setShops(data);
    }

    useEffect(() => {
      loadInitialPosition = async () => {
        const { granted } = await requestPermissionsAsync();
        if (granted) {
          const location = await getCurrentPositionAsync({
            enableHighAccuracy: true
          });
          const { latitude, longitude } = location.coords;
          setCurrentRegion({
            latitude,
            longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          })
        }          
      }

      loadInitialPosition();
    }, [])

    if (!currentRegion) {
        return null;
    }

    return (
      <>
        <MapView onRegionChangeComplete={handleRegionChange} initialRegion={currentRegion} style={style.map}>          
          {shops.map(shop => (
            <Marker key={shop._id} coordinate={{
              latitude: shop.location.coordinates[1],
              longitude: shop.location.coordinates[0]
            }}>           
            <Callout>
              <View style={style.callout}>
                <Text style={style.shopName}>{shop.name}</Text>
                <Text style={style.shopAbout}>{shop.about}</Text>
              </View>
            </Callout>
            </Marker>
          ))}
          <Circle
            center={currentRegion}
            radius={3000}
            strokeColor={"rgba(255,0,0,1)"}
            zIndex={2}
            strokeWidth={2}
            miterLimit={1}
          />
        </MapView>
        <View style={style.searchForm}>
          <TextInput
            style={style.searchInput}
            placeholder="Buscar por ..."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity onPress={loadShops} style={style.loadButton} >
            <MaterialIcons name="my-location" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </>
    );
}

const style = StyleSheet.create({
  map: {
    flex: 1
  },
  callout: {
    width: 260
  },
  shopName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  shopAbout: {
    color: '#666',
    marginTop: 5
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'        
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
        width: 4,
        height: 4,
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#17804a',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
})

export default Main;