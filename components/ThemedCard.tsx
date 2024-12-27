import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';

export default function ThemedCard({ children, style, ...props }) {
  const colorScheme = useColorScheme(); // Detect the current theme (light or dark)
  const isDarkMode = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.card,
        isDarkMode ? styles.darkCard : styles.lightCard,
        style, // Allow overriding or extending styles
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 0,
    borderWidth: 1,
  },
  lightCard: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  darkCard: {
    backgroundColor: '#333',
    borderColor: '#555',
  },
});
