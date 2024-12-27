import { StyleSheet, Image, Platform, ScrollView, View, useColorScheme } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { BarChart, LineChart, LineChartBicolor, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import ThemedChart from '@/components/ThemedChart';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';

// ...
export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {key:'1', label: 'Apple', value: 'apple'},
    {key:'2', label: 'Banana', value: 'banana'}
  ]);
      const theme = colorScheme;

  const data = [
    {
      data: [23, 25, 22, 24, 26, 30, 28, 29, 30],
      color: (opacity = 1) => `rgba(255, 206, 86, ${opacity})`, // Yellow for Temperature
    },
    {
      data: [60, 65, 70, 62, 58, 55, 50, 53, 57],
      color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // Blue for Humidity
    },
  ];

  const labels = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#121212' : '#F5F5F5' }}>
      <View style={{ marginTop: 20 }}>
        <ThemedChart
          data={data}
          labels={labels}
          theme={theme}
          title="Temperature and Humidity"
        />
      </View>
         <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
