
import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
import app from '../../firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);

export default function ProfileScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('Build Muscle');

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const snapshot = await getDoc(doc(db, 'users', user.uid));

        if (snapshot.exists()) {
          const data = snapshot.data();
          setName(data.name || '');
          setEmail(data.email || user.email || '');
          setFitnessGoal(data.fitnessGoal || 'Build Muscle');
        } else {
          setEmail(user.email || '');
        }
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        { name, email, fitnessGoal },
        { merge: true }
      );

      Alert.alert('Success', 'Profile Updated!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineLarge" style={styles.title}>
        My Profile 👤
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.label}>Email</Text>
          <Text style={styles.email}>{email}</Text>
        </Card.Content>
      </Card>

      <Text variant="titleMedium" style={styles.label}>Your Name</Text>
      <TextInput
        label="Name"
        mode="outlined"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text variant="titleMedium" style={styles.label}>
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

      <Button mode="contained" onPress={saveProfile} style={styles.button}>
        Save Changes
      </Button>

      <Button mode="outlined" onPress={logout} style={styles.button}>
        Logout
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
    padding: 20,
    paddingTop: 35,
  },
  title: {
    color: '#B6F23A',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1C2732',
    marginVertical: 10,
    borderRadius: 15,
  },
  label: {
    color: '#B6F23A',
    marginTop: 10,
  },
  email: {
    color: '#FFFFFF',
    marginTop: 8,
  },
  input: {
    marginVertical: 15,
    backgroundColor: '#1C2732',
  },
  goalButton: {
    marginVertical: 5,
  },
  button: {
    marginTop: 15,
  },
});
