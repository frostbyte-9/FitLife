
import React, { useState } from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import app from '../../firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('Build Muscle');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must contain at least 6 characters.');
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await setDoc(doc(db, 'users', result.user.uid), {
        name: name.trim(),
        email: email.trim(),
        fitnessGoal,
      });

      navigation.replace('Home');
    } catch (error: any) {
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineLarge" style={styles.title}>
        Create Account 💪
      </Text>

      <Text variant="bodyMedium" style={styles.subtitle}>
        Start your fitness journey with FitLife.
      </Text>

      <TextInput
        label="Name"
        mode="outlined"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

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

      <Text variant="titleMedium" style={styles.goalTitle}>
        Choose Fitness Goal
      </Text>

      {['Build Muscle', 'Lose Fat', 'Improve Fitness'].map(goal => (
        <Button
          key={goal}
          mode={fitnessGoal === goal ? 'contained' : 'outlined'}
          onPress={() => setFitnessGoal(goal)}
          style={styles.goalButton}
        >
          {goal}
        </Button>
      ))}

      <Text style={styles.selected}>
        Selected Goal: {fitnessGoal}
      </Text>

      <Button mode="contained" onPress={register} style={styles.button}>
        Register
      </Button>

      <Button onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101820',
  },
  content: {
    padding: 25,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    color: '#B6F23A',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#AAAAAA',
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#1C2732',
  },
  goalTitle: {
    color: '#B6F23A',
    marginTop: 20,
    marginBottom: 10,
  },
  goalButton: {
    marginVertical: 5,
  },
  selected: {
    color: '#FFFFFF',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
});
