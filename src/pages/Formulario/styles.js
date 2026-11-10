import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    height: 45,
    borderBottomWidth: 2,
    borderColor: '#222',
    fontSize: 18,
    marginBottom: 20,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botao: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  textoBotao: {
    fontSize: 18,
  },
});

export { styles };
