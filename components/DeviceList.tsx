import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
// import {styles} from './styles/styles';

 const DeviceList = ({peripheral, connect, disconnect}) => {
  const {name, rssi, connected} = peripheral;
  return (
    <>
      {name && (
        <View style={styles.deviceContainer}>
          <View style={styles.deviceItem}>
            <Text style={styles.deviceName}>{name}</Text>
            <Text style={styles.deviceInfo}>RSSI: {rssi}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              connected ? disconnect(peripheral) : connect(peripheral)
            }
            style={styles.deviceButton}>
            <Text
              style={[
                styles.scanButtonText,
                {fontWeight: 'bold', fontSize: 16},
              ]}>
              {connected ? 'Disconnect' : 'Connect'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DeviceList



export const styles = StyleSheet.create({
  deviceContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deviceItem: {
    marginBottom: 15,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deviceInfo: {
    fontSize: 14,
    color: '#777',
  },
  deviceButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  scanButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
