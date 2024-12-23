import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function WeatherWidget({ latestData }) {
  return (
    <View style={styles.weatherWidget}>
      <View>
        <ThemedText style={styles.temperature}>{latestData.temperature}°C</ThemedText>
        <ThemedText style={styles.feelsLike}>HUMIDITY: {latestData.humidity}%</ThemedText>
        <ThemedText style={styles.wind}>WIND ↗ {latestData.speed} km/h</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  feelsLike: {
    fontSize: 16,
  },
  wind: {
    fontSize: 16,
  },
});