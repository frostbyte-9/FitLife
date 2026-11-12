
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../../firebaseConfig';

const auth = getAuth(app);

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('Home');
    } catch (error: any) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displayLarge" style={styles.logo}>
        FitLife 💪
      </Text>

      <Text variant="titleLarge" style={styles.subtitle}>
        Welcome Back!
      </Text>

      <Text variant="bodyMedium" style={styles.description}>
        Your fitness journey starts here.
      </Text>

      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button mode="contained" onPress={login} style={styles.loginButton}>
        Login
      </Button>

      <Button onPress={() => navigation.navigate('Register')}>
        Create Account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#101820',
  },
  logo: {
    color: '#B6F23A',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
  },
  description: {
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#1C2732',
  },
  loginButton: {
    marginTop: 15,
    marginBottom: 10,
  },
});
