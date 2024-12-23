import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  // Fetch locations on component mount
  useEffect(() => {
    fetch('https://climatenet.am/device_inner/list/')
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
        setSelectedLocationId(data[0]?.id); // Set the first location's ID as default
      })
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  // Fetch latest data when a location is selected
  useEffect(() => {
    if (selectedLocationId) {
      setLoading(true);
      fetch(`https://climatenet.am/device_inner/${selectedLocationId}/latest/`)
        .then((response) => response.json())
        .then((data) => {
          setLatestData(data[0]); // Assuming the API returns an array
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching latest data:', error);
          setLoading(false);
        });
    }
  }, [selectedLocationId]);

  // Memoized picker items to prevent re-rendering
  const pickerItems = useMemo(
    () =>
      locations.map((location) => (
        <Picker.Item
          key={location.id}
          label={`${location.name} (${location.parent_name})`}
          value={String(location.id)}
        />
      )),
    [locations]
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image source={require('@/assets/banner_3.webp')} style={styles.weatherImage} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.userName}>
          {locations.find((loc) => loc.id === selectedLocationId)?.name || 'Select a location'}
        </ThemedText>
        <Picker
          selectedValue={String(selectedLocationId)} // Ensure this matches the available values
          style={styles.picker}
          onValueChange={(value) => setSelectedLocationId(parseInt(value, 10))}
        >
          {pickerItems}
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={textColor} />
      ) : latestData ? (
        <>
          {/* Weather Widget */}
          <View style={styles.weatherWidget}>
            <View>
              <ThemedText style={styles.temperature}>
                {latestData.temperature}°C
              </ThemedText>
              <ThemedText style={styles.feelsLike}>
                HUMIDITY: {latestData.humidity}%
              </ThemedText>
              <ThemedText style={styles.wind}>
                WIND ↗ {latestData.speed} km/h
              </ThemedText>
            </View>
          </View>

          {/* Air Pollution Card */}
          <View style={styles.pollutionCard}>
            <ThemedText style={styles.pollutionHeader}>
              Air Pollution (PM2.5) <ThemedText style={styles.date}>{new Date(latestData.time).toLocaleString()}</ThemedText>
            </ThemedText>
            <ThemedText style={styles.pollutionStatus}>
              PM2.5: {String(latestData.pm2_5)} μm
            </ThemedText>
            <View style={styles.metrics}>
              <ThemedText style={styles.metric}>UV: {latestData.uv}</ThemedText>
              <ThemedText style={styles.metric}>LIGHT: {latestData.lux} Lx</ThemedText>
              <ThemedText style={styles.metric}>RAIN: {latestData.rain} mm</ThemedText>
              <ThemedText style={styles.metric}>PRESSURE: {latestData.pressure} hPa</ThemedText>
            </View>
          </View>
        </>
      ) : (
        <ThemedText style={{ color: textColor, textAlign: 'center', marginTop: 20 }}>
          Select a location to view data.
        </ThemedText>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: 200,
    color: '#000',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#1c1c1c',
  },
  weatherWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherImage: {
    width: '100%',
    height: '100%',
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
