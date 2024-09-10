// src/screens/RegisterUser.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        Alert.alert('Error', data.message || 'Hubo un problema al registrar el usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Nombre</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ingrese su nombre"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese su correo"
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Text>Contraseña</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Ingrese su contraseña"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

export default RegisterUser;
