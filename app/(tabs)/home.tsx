import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator,Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import LocationPicker from '@/components/LocationPicker';
import WeatherWidget from '@/components/WeatherWidget';
import AirPollutionCard from '@/components/AirPollutionCard';

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch locations on component mount
  useEffect(() => {
    fetch('https://climatenet.am/device_inner/list/')
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
        setSelectedLocationId(data[0]?.generated_id); 
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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={ <Image source={require('@/assets/banner_3.webp')} style={styles.weatherImage} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.userName}>
          {locations.find((loc) => loc.generated_id === selectedLocationId)?.name || 'Select a location'}
        </ThemedText>
        <LocationPicker
          locations={locations}
          selectedLocationId={selectedLocationId}
          onLocationChange={setSelectedLocationId}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : latestData ? (
        <>
          <WeatherWidget latestData={latestData} />
          <AirPollutionCard latestData={latestData} />
        </>
      ) : (
        <ThemedText style={styles.noDataText}>
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
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
  },
  weatherImage: {
    width: '100%',
    height: '100%',
  },
});