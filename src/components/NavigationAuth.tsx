import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import HomePage from '../screens/Home/HomeScreen';
import ProductsScreen from '../screens/Stock/ProductsScreen';
import Register from '../screens/UserSignUp/Register';
import UserScreen from '../screens/Users/UsersScreen';
import { RootStackParamList } from '../types/Interfaces';
import LoginScreen from '../screens/Login/LoginScreen';
import Movements from '../screens/AvailableMovements/Shipments';
import ShipmentsList from '../screens/Deliveries/DriversMovementList';
import MapView from '../screens/Map/DeliveryMap';

const Stack = createStackNavigator<RootStackParamList>();

const LoginNavigation = () => {
  const { user, getRoleScreen } = useAuth();
  const initialRouteName: keyof RootStackParamList = user ? getRoleScreen() : "Login";

  console.log("User:", user);
  console.log("Initial Route:", initialRouteName);

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {user ? (
        <>
          {user.profile === "admin" && (
            <>
              <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
              <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            </>
          )}
          {user.profile === "filial" && (
            <>
              <Stack.Screen name="Shipments" component={Movements} options={{ headerShown: false }} />
              <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{ headerShown: false }} />
            </>
          )}
          {user.profile === "motorista" && (
            <>
              <Stack.Screen name="ShipmentsList" component={ShipmentsList} options={{ headerShown: false }} />
              <Stack.Screen name="MapView" component={MapView} options={{ headerShown: false }} />
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default LoginNavigation;
