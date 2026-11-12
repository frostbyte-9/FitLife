
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

const workouts = [
  {
    title: 'Push Day 🔥',
    exercises: ['Incline Dumbbell Press', 'Shoulder Press', 'Cable Pushdown'],
  },
  {
    title: 'Pull Day 💪',
    exercises: ['Lat Pulldown', 'Seated Row', 'Dumbbell Curl'],
  },
  {
    title: 'Leg Day 🦵',
    exercises: ['Smith Squat', 'Leg Extension', 'Leg Curl'],
  },
];

export default function WorkoutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Workout Plans
      </Text>

      {workouts.map(workout => (
        <Card key={workout.title} style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.heading}>
              {workout.title}
            </Text>

            {workout.exercises.map((exercise, index) => (
              <Text key={index} style={styles.exercise}>
                {index + 1}. {exercise}
              </Text>
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101820' },
  title: {
    color: '#B6F23A',
    fontWeight: 'bold',
    margin: 20,
    marginTop: 35,
  },
  card: {
    backgroundColor: '#1C2732',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
  heading: { color: '#B6F23A', marginBottom: 15 },
  exercise: { color: '#FFFFFF', marginVertical: 6 },
});
