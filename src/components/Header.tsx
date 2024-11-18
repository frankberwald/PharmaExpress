import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.welcomeCard}>
      <Text style={{ ...styles.title, textAlign: 'right', left: 80 }}>
        Bem Vindo, Franklin!
      </Text>
      <Image
        source={require('../../assets/profileExample.png')}
        style={styles.profile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeCard: {
    flexDirection: 'row',
    width: 400,
    height: 80,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#b53b45',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 230,
    right: 5
  },
  profile: {
    width: 70,
    height: 70,
    right: 240,
    borderRadius: 50
  },
  title: {
    color: '#fff',
    fontSize: 20
  }
});

export default Header;
