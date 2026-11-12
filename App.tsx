
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';
import NutritionScreen from './src/screens/NutritionScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import WorkoutHistoryScreen from './src/screens/WorkoutHistoryScreen';

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#B6F23A',
    secondary: '#8BC34A',
    background: '#101820',
    surface: '#1C2732',
    onSurface: '#FFFFFF',
    onBackground: '#FFFFFF',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#101820' },
            headerTintColor: '#B6F23A',
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: '#101820' },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Workout" component={WorkoutScreen} />
          <Stack.Screen name="Nutrition" component={NutritionScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="WorkoutHistory"
            component={WorkoutHistoryScreen}
            options={{ title: 'Workout Tracking' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
