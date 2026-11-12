
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function NutritionScreen() {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
      .then(response => response.json())
      .then(data => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineLarge" style={styles.title}>
        Nutrition 🥗
      </Text>

      <Text variant="bodyLarge" style={styles.subtitle}>
        Chicken Recipes from TheMealDB API
      </Text>

      {loading ? (
        <Text style={styles.message}>Loading recipes...</Text>
      ) : meals.length === 0 ? (
        <Text style={styles.message}>No recipes found.</Text>
      ) : (
        meals.map(meal => (
          <Card key={meal.idMeal} style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.mealTitle}>
                {meal.strMeal}
              </Text>
              <Text style={styles.details}>
                Category: {meal.strCategory || 'Recipe'}
              </Text>
              <Text style={styles.details}>
                Area: {meal.strArea || 'Unknown'}
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
    marginBottom: 10,
  },
  subtitle: {
    color: '#FFFFFF',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1C2732',
    marginVertical: 10,
    borderRadius: 15,
  },
  mealTitle: {
    color: '#B6F23A',
    marginBottom: 10,
  },
  details: {
    color: '#FFFFFF',
    marginVertical: 4,
  },
  message: {
    color: '#FFFFFF',
    marginTop: 20,
  },
});
