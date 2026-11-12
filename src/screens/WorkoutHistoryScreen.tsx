

import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import app from '../../firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);

export default function WorkoutHistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);

  const loadHistory = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = query(
        collection(db, 'workouts'),
        where('userId', '==', user.uid)
      );

      const snapshot = await getDocs(q);

      const data: any[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      data.sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );

      setHistory(data);
    } catch (error: any) {
      Alert.alert('Error loading history', error.message);
    }
  };

  const saveWorkout = async (workout: string) => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'Please login first.');
      return;
    }

    try {
      await addDoc(collection(db, 'workouts'), {
        userId: user.uid,
        workout,
        date: new Date().toISOString(),
      });

      Alert.alert('Success', `${workout} completed!`);
      await loadHistory();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Workout Tracking 🏋️
      </Text>

      <Text variant="titleMedium" style={styles.subtitle}>
        Mark today's completed workout
      </Text>

      {['Push Day', 'Pull Day', 'Leg Day'].map(workout => (
        <Button
          key={workout}
          mode="contained"
          style={styles.button}
          onPress={() => saveWorkout(workout)}
        >
          Complete {workout}
        </Button>
      ))}

      <Text variant="headlineSmall" style={styles.heading}>
        Workout History
      </Text>

      {history.length === 0 ? (
        <Text style={styles.text}>No workouts completed yet.</Text>
      ) : (
        history.map(item => (
          <Card key={item.id} style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.text}>
                {item.workout}
              </Text>
              <Text style={styles.text}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#101820',
    flexGrow: 1,
  },
  title: {
    color: '#B6F23A',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subtitle: {
    color: '#FFFFFF',
    marginBottom: 15,
  },
  button: {
    marginVertical: 8,
  },
  heading: {
    color: '#B6F23A',
    marginTop: 30,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1C2732',
    marginVertical: 8,
  },
  text: {
    color: '#FFFFFF',
  },
});
