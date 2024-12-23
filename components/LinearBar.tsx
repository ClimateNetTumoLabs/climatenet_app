import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Tooltip } from 'react-native-elements'; // Or any tooltip library you prefer
import 'intl'; // For date formatting
import 'intl/locale-data/jsonp/en'; // Import locale if needed
import { ThemedText } from './ThemedText';

export default function LinearBar({ air_quality, datetime }) {
  const [airQuality, setAirQuality] = useState(air_quality);

  useEffect(() => {
    setAirQuality(air_quality);
  }, [air_quality]);

  const scale = [
    { max: 12, color: '#00ff00', status: 'good', number: "1" },
    { max: 35, color: '#ffff00', status: 'moderate', number: "2" },
    { max: 55, color: '#ffcc00', status: 'unhealthySensitiveGroups', number: "3" },
    { max: 150, color: '#ff9900', status: 'unhealthy', number: "4" },
    { max: 250, color: '#ff0000', status: 'veryUnhealthy', number: "5" },
    { max: Infinity, color: '#990000', status: 'hazardous', number: "6" },
  ];

  const getColorAndStatusForAirQuality = (value) => {
    for (let i = 0; i < scale.length; i++) {
      if (value <= scale[i].max) {
        return scale[i];
      }
    }
    return scale[scale.length - 1]; // Default to hazardous if above all thresholds
  };

  const { color, status, number } = getColorAndStatusForAirQuality(airQuality);

  const getPointerPosition = (value) => {
    const maxValue = 500;
    const segments = scale.length;
    const segmentWidth = 100 / segments;

    for (let i = 0; i < scale.length; i++) {
      if (value <= scale[i].max) {
        const segmentStart = i * segmentWidth;
        const segmentPosition =
          ((value - (i > 0 ? scale[i - 1].max : 0)) /
            (scale[i].max - (i > 0 ? scale[i - 1].max : 0))) *
          segmentWidth;
        return Math.min(segmentStart + segmentPosition, 100);
      }
    }
    return 100; // If value exceeds the maximum
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.title}>{'linerStatusBar.airQualityTitle'}</Text> */}
        <ThemedText style={styles.datetime}>
          {new Date(datetime.time).toLocaleString('en-GB', {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </ThemedText>
      </View>
      <View style={styles.statusContainer}>
        <Tooltip
          popover={
            <Text>
              micro = 10<sup>-6</sup>
            </Text>
          }
        >
          <ThemedText style={styles.statusText}>
            {status} ({airQuality} )
          </ThemedText>
        </Tooltip>
        <TouchableOpacity
          onPress={() => {
            // Navigate to the about page or handle your link logic
          }}
        >
          <View style={[styles.circle, { backgroundColor: color }]}>
            <ThemedText style={styles.circleText}>{number}</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.progressBar}>
        {scale.map((segment, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              {
                left: `${(index / scale.length) * 100}%`,
                width: `${100 / scale.length}%`,
                backgroundColor: segment.color,
                zIndex: scale.length - index,
              },
            ]}
          />
        ))}
        <View
          style={[
            styles.pointer,
            {
              left: `${getPointerPosition(airQuality)}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  datetime: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  progressBar: {
    position: 'relative',
    height: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  segment: {
    position: 'absolute',
    height: '100%',
  },
  pointer: {
    position: 'absolute',
    height: 30,
    width: 5,
    borderRadius: 2.5,
  },
});
