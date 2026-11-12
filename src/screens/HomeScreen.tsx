
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        FitLife 💪
      </Text>

      <Text variant="titleMedium" style={styles.subtitle}>
        Welcome to your fitness journey!
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">🏋️ Workout Plans</Text>
          <Text>Train smarter and build strength.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Workout')}>
            Explore Workouts
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">📊 Workout Tracking</Text>
          <Text>Record completed workouts and track history.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('WorkoutHistory')}>
            Track Workouts
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">🥗 Nutrition</Text>
          <Text>Discover healthy food information.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Nutrition')}>
            Explore Nutrition
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">👤 My Profile</Text>
          <Text>View your personal account details.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Profile')}>
            View Profile
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101820',
  },
  title: {
    fontWeight: 'bold',
    color: '#B6F23A',
    marginTop: 35,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  subtitle: {
    color: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  card: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: '#1C2732',
  },
});
