import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = () => {
  const translateXValue = useRef(new Animated.Value(-300)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translateXValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 1000,
        delay: 2000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ translateX: translateXValue }],
            opacity: opacityValue
          },
        ]}
      >
        <Image style={styles.image} source={require('../../../assets/logonew.png')} resizeMode='cover' />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9d232d',
  },
  animatedContainer: {
    alignItems: 'center'
  },
  image: {
    width: 363,
    height: 350,
    marginBottom: 20,
    borderRadius: 10
  }
});

export default SplashScreen;