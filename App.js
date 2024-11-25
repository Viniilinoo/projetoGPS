import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, Pressable,Image } from 'react-native';
import logo from '../ProjetoCEP/assets/local.png';
import axios from 'axios';

export default function App() {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');

  const buscarEndereco = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado');
      } else {
        setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar CEP');
    }
  };

  const limparusario = async () => {
    setNome('');
    setCep('');
    setEndereco('');
    setIdade('');
    setCpf('');
  }

  const handleSubmit = async () => {
    if (!cpf || !nome || !idade || !cep || !endereco) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    try {
      const response = await axios.post('http://26.215.35.92:3000/users', {
        cpf, nome, idade,cep, endereco
      });
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
      limparusario();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar usuário');
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.div}>
        <Image source={logo} style={styles.lg} />
      </View>
      <Text style={styles.title}>Cadastro CEP	</Text>

      <Text>Nome: </Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <Text>CPF: </Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
      />
      <Text>idade: </Text>
      <TextInput
        style={styles.input}
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />
      <Text>CEP: </Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={(text) => {
          setCep(text);
          if (text.length === 8) {
            buscarEndereco(text);
          }
        }}
        keyboardType="numeric"
      />
      <Text>Endereço: </Text>
      <TextInput
        style={styles.input}
        value={endereco}
        editable={false}
      />

<Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.texto3}>Cadastrar</Text>
          </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#98908d"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 0,
    borderStyle:"dashed",
    display: "flex",  
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
    },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  texto3: {
    color: "white"
  },
  lg: {
    display: "flex",
    width: 100,
    height: 100,
  },
  div: {
    display: "flex",
    marginLeft: 130
  }
});
