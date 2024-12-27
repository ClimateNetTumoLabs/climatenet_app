import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedCard from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import LinearBar from './LinearBar';

export default function AirPollutionCard({ latestData }) {
  return (
    <ThemedCard>
      <View style={styles.header}>
        <ThemedText style={styles.pollutionHeader}>Air Pollution (PM2.5)</ThemedText>
       
      </View>

      <ThemedText style={styles.pollutionStatus}>
        PM2.5: {latestData.pm2_5} μm
      </ThemedText>

      <LinearBar air_quality={latestData.pm2_5} datetime={new Date(latestData.time).toLocaleString()} />

      <View style={styles.divider} />

      <View style={styles.metrics}>
        <View style={styles.metricRow}>
          <ThemedText style={styles.metric}>🌞 UV: {latestData.uv}</ThemedText>
          <ThemedText style={styles.metric}>💡 Light: {latestData.lux} Lx</ThemedText>
        </View>
        <View style={styles.metricRow}>
          <ThemedText style={styles.metric}>🌧️ Rain: {latestData.rain} mm</ThemedText>
          <ThemedText style={styles.metric}>
            🌡️ Pressure: {latestData.pressure} hPa
          </ThemedText>
        </View>
      </View>
    </ThemedCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pollutionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
  },
  pollutionStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  metrics: {
    marginTop: 10,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  metric: {
    fontSize: 14,
  },
});
