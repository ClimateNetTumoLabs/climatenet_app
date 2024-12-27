import React from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const ThemedChart = ({ data, labels, theme, title }) => {
  const screenWidth = Dimensions.get('window').width;
  const isDark = theme === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#333333' : '#FFFFFF' },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#333333' }]}>
        {title}
      </Text>
      <LineChart
        data={{
          labels: labels,
          datasets: data,
        }}
        width={screenWidth - 32} // Adjust to fit within screen
        height={220}
        chartConfig={{
          backgroundColor: isDark ? '#121212' : '#F5F5F5',
          backgroundGradientFrom: isDark ? '#121212' : '#F5F5F5',
          backgroundGradientTo: isDark ? '#1F1F1F' : '#FFFFFF',
          decimalPlaces: 1,
          color: (opacity = 1) =>
            isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) =>
            isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: isDark ? '#FFD700' : '#2196F3',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default ThemedChart;
