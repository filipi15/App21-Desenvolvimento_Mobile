import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function Card({ data, funcCarregarTarefas }) {
  const navigation = useNavigation();

  const excluirTarefa = async () => {
    const lista = await AsyncStorage.getItem('tarefas')
    let tarefas = lista !== null ? JSON.parse(lista) : []

    let novaLista = tarefas.filter((item) => item.id !== data.id)

    await AsyncStorage.setItem('tarefas', JSON.stringify(novaLista));
    await funcCarregarTarefas();
  }

  function irFormulario() {
    navigation.navigate('Formulario', { id: data.id, nome: data.nome, atualizarLista: funcCarregarTarefas });
  }

  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{data.nome}</Text>

      <TouchableOpacity style={styles.botao} onPress={irFormulario}>
        <FontAwesome name='pencil' size={22} color='#11118c' />
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={excluirTarefa}>
        <FontAwesome name='minus' size={22} color='red' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#222',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
  },
  nome: {
    flex: 1,
    fontSize: 18,
  },
  botao: {
    paddingHorizontal: 10,
  },
});

export default Card;
