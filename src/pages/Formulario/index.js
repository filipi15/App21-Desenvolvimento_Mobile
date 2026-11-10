import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export default function Formulario({ route }) {
  const [id, setId] = useState(route.params?.id)
  const [nome, setNome] = useState(route.params?.nome)
  const navigation = useNavigation();

  const salvarTarefa = async () => {
    if (nome === undefined || nome.trim() === '') {
      alert('Digite o nome da tarefa!')
      return;
    }

    const lista = await AsyncStorage.getItem('tarefas')
    let tarefas = lista !== null ? JSON.parse(lista) : []

    if (id !== undefined) {
      // Alterar
      tarefas = tarefas.map((item) => item.id === id ? { id: id, nome: nome } : item)
    } else {
      // Incluir
      tarefas.push({ id: Date.now(), nome: nome })
    }

    await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
    await route.params?.atualizarLista();

    Keyboard.dismiss();
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome da Tarefa</Text>
      <TextInput
        style={styles.input}
        defaultValue={route.params?.nome}
        onChangeText={(texto) => setNome(texto)}
        underlineColorAndroid="transparent"
      />

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={salvarTarefa}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
