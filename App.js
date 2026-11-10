import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tarefas from './src/pages/Tarefas';
import Formulario from './src/pages/Formulario';

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tarefas">
        <Stack.Screen name="Tarefas" component={Tarefas} />
        <Stack.Screen name="Formulario" component={Formulario} options={{ title: 'Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
