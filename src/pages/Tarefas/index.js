import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/Card';
import { styles } from './styles';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([])
  const navigation = useNavigation();

  // Quando o componente é montado em tela (quando abrimos o App)
  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    const lista = await AsyncStorage.getItem('tarefas')
    if (lista !== null) {
      setTarefas(JSON.parse(lista))
    } else {
      setTarefas([])
    }
  }

  function irFormulario() {
    navigation.navigate('Formulario', { atualizarLista: carregarTarefas });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card data={item} funcCarregarTarefas={carregarTarefas} />}
      />

      <TouchableOpacity style={styles.botaoIncluir} onPress={irFormulario}>
        <Text style={styles.textoIncluir}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
