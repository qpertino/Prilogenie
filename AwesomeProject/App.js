import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './akran/AuthScreen';
import TopGScreen from './akran/TopG';
import { View, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#5DADE2', // Цвет заднего фона заголовка
          },
          headerTintColor: '#fff', // Цвет текста заголовка
          headerTitleStyle: {
            fontWeight: 'bold', // Жирный текст заголовка
            textAlign: 'center', // Выравнивание заголовка по центру
          },
        }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            title: 'Авторизация',
          }}
        />
        <Stack.Screen
          name="TopG"
          component={TopGScreen}
          options={{
            title: 'Главный экран',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
