import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import LinearBar from './LinearBar';

export default function AirPollutionCard({ latestData }) {
  return (
    <View style={styles.pollutionCard}>
    <ThemedText style={styles.pollutionHeader}>
    Air Pollution (PM2.5) <ThemedText style={styles.date}>{new Date(latestData.time).toLocaleString()}</ThemedText>
    </ThemedText>

      <ThemedText style={styles.pollutionStatus}>PM2.5: {latestData.pm2_5} μm</ThemedText>
      <LinearBar air_quality={latestData.pm2_5} datetime={latestData.time} />
      <View style={styles.metrics}>

        <ThemedText style={styles.metric}>UV: {latestData.uv}</ThemedText>
        <ThemedText style={styles.metric}>LIGHT: {latestData.lux} Lx</ThemedText>
        <ThemedText style={styles.metric}>RAIN: {latestData.rain} mm</ThemedText>
        <ThemedText style={styles.metric}>PRESSURE: {latestData.pressure} hPa</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pollutionCard: {
    padding: 15,
    borderRadius: 10,
  },
  pollutionHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
  },
  pollutionStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metrics: {
    marginTop: 10,
  },
  metric: {
    fontSize: 14,
    marginBottom: 5,
  },
});