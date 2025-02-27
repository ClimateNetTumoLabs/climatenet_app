import React, { useState, useEffect } from 'react';
import {
  Text,
  Alert,
  View,
  FlatList,
  Platform,
  StatusBar,
  SafeAreaView,
  NativeModules,
  PermissionsAndroid,
  StyleSheet,
  NativeEventEmitter,
  TouchableOpacity,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DeviceList } from '@/components/DeviceList';
import { PanGestureHandler } from 'react-native-gesture-handler'; // Import PanGestureHandler
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import { connectToDevice, disconnectDevice, startScan, stopScan } from '@/core/helpers/BleManager';
import { requestBluetoothPermissions } from '@/core/helpers/BlePermissions';

// iOS Bluetooth permissions (Info.plist)
if (Platform.OS === 'ios') {
  // You need to configure the `NSBluetoothPeripheralUsageDescription` in your Info.plist
}

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


const App = () => {
  const peripherals = new Map();
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);
  const [devices,setDevices] = useState([])
  
  console.log(devices );
  const [scannedDevices, setScannedDevices] = useState([]);
  const [foundDevice, setFoundDevice] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
      // Request Bluetooth permissions on mount
      requestBluetoothPermissions();

      // Start scanning automatically
      startScan((devices) => {
          setScannedDevices(devices);

          // If a new device is found, show the popup and update it
          if (devices.length > 0) {
              setFoundDevice(devices[0]); // Show the first found device
              setPopupVisible(true);
          }
      });

      // Stop scanning when the component unmounts
      return () => stopScan();
  }, []);

  const handleConnect = (device) => {
      // Stop scanning when the user clicks "Connect"
      // stopScan();
      connectToDevice(device,setDevices)
      .then((data)=>{
        console.log("0000000000000");
        console.log(data);
        
        console.log("0000000000000");
        
      })
      setPopupVisible(false);
  };

  const onSwipeUp = ({ nativeEvent }) => {
    if (nativeEvent.translationY < -150) { // Detect swipe-up threshold
      startScan(setDiscoveredDevices); // Trigger the scan (reload action)
    }
  };
  const handleConnectDevice = async (deviceId) => {
    try {
      await BleManager.connect(deviceId);
      console.log(`Connected to device ${deviceId}`);
      // Alert.alert('Connected', `Successfully connected to ${deviceId}`);
      
      // Refresh the list of connected devices
      // handleGetConnectedDevices();
    } catch (error) {
      console.error('Connection error:', error);
      Alert.alert('Error', 'Failed to connect to the device');
    }
  };
  
  const handleDisconnectDevice = async (deviceId) => {
    try {
      // await BleManager.disconnect(deviceId);
      console.log(`Disconnected from device ${deviceId}`);
      // Alert.alert('Disconnected', `Successfully disconnected from ${deviceId}`);
      
      // Refresh the list of connected devices
      // handleGetConnectedDevices();
    } catch (error) {
      console.error('Disconnection error:', error);
      Alert.alert('Error', 'Failed to disconnect from the device');
    }
  };
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Ensure root view is wrapped */}
      <SafeAreaView style={styles.container}>
        <PanGestureHandler onGestureEvent={onSwipeUp}>
          {/* Only one child allowed here, wrapping the whole content */}
          <View style={styles.content}>
            <Text style={styles.title}>React Native BLE Manager</Text>
            <TouchableOpacity onPress={startScan} style={styles.scanButton}>
              <Text style={styles.scanButtonText}>
                {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>Discovered Devices:</Text>
            {(scannedDevices && scannedDevices.length) > 0 ? (
               <FlatList
               data={scannedDevices}
               renderItem={({ item }) => (
                 <View style={styles.item}>
                   <Text style={styles.title}>{item.name}</Text>
                   <TouchableOpacity onPress={() => handleConnect(item)} style={styles.disconnectButton}>
                    <Text style={styles.disconnectButtonText}>connect</Text>
                  </TouchableOpacity>
                 </View>
               )}
               keyExtractor={item => item.id}
             />
            ) : (
              <Text>No Bluetooth devices found</Text>
            )}
            {/* {devices.length > 0 && <View>{devices[0]}</View> } */}
            {/* <FlatList
              data={devices}
              renderItem={({item}) => <Item title={item.name} />}
              keyExtractor={item => item.id}
            /> */}
            <Text style={styles.subtitle}>Connected Devices:</Text>
            {(devices && devices.length) > 0 &&
              <FlatList
              data={devices}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.title}>{item.name}</Text>
                  <TouchableOpacity onPress={() => disconnectDevice(item,setDevices)} style={styles.disconnectButton}>
                    <Text style={styles.disconnectButtonText}>disconnect</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.id}
            />
            
            }
            
          </View>


        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  scanButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default App;
