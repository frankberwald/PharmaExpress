import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginNavigation from './src/components/NavigationAuth'
import { AuthProvider } from './src/contexts/AuthContext';
import SplashScreen from './src/screens/AppIntro/SplashScreen';
import { useEffect, useState } from 'react';
const Stack = createStackNavigator()

export default function App() {
  const [splashVisible, setSplashVisible] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])


  return (
    <AuthProvider>
      {splashVisible ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='LoginRoute'>
            <Stack.Screen
              name="LoginRoute"
              component={LoginNavigation}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthProvider>
  )
}