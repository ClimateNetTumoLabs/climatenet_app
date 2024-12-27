import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export default function LocationPicker({ locations, selectedLocationId, onLocationChange }) {
    
  return (
    <Picker
      mode={"dropdown"}
      selectedValue={selectedLocationId}
      style={styles.picker}
      onValueChange={onLocationChange}
    >
      {locations.map((location) => (
        <Picker.Item
          style={styles.item}
          key={location.generated_id}
          label={`${location.name} (${location.parent_name})`}
          value={location.generated_id}
        />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 5,
    width: 200,
    padding:5,
    margin:1,

  },
  item:{
    color:'red',
    
  }
});
