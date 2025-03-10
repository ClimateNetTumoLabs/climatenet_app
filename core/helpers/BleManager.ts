import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
// const CHARACTERISTIC_UUID = "12345678-1234-5678-1234-56789abcdef2";
const CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

const manager = new BleManager();

export const startScan = (setScannedDevices) => {
    setScannedDevices([]);
    manager.startDeviceScan(
        null,
        { allowDuplicates: false },
        (error, device) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log(device?.name ,device?.serviceUUIDs);
            
            if (device.name) {
                // connectToDevice(device,setScannedDevices)
                // sendMessage(device,"hello")
                setScannedDevices(prevDevices => {
                    if (!prevDevices.some(d => d.id === device.id)) {
                        return [...prevDevices, device];
                    }
                    return prevDevices;
                });
            }
        }
    );
};

export const stopScan = () => {
    manager.stopDeviceScan();
};

export const connectToDevice = async (device, setConnectedDevice) => {
    try {
        stopScan();
        console.log("Connecting to device...",device?.serviceUUIDs);
        const connected = await manager.connectToDevice(device.id);
        
        // console.log("charrr",await manager.discoverAllServicesAndCharacteristicsForDevice(device.id))
      const serv =   await connected.discoverAllServicesAndCharacteristics();
        console.log("services---: ",serv);
        
        sendMessage(connected,"helllo22323\r\n")
        setConnectedDevice((prev)=>
        {
            console.log("debug_____++++:",connected)
            
            if(connected)
                return [connected]
            return prev
        });

        console.log("Connected to ESP32:", connected.id);
        return connected;
    } catch (error) {
        console.error("Connection error:", error);
        return null;
    }
};

export const sendMessage = async (connectedDevice, message) => {
    // console.log("debugg: ",connectedDevice.isConnected);
    
    if (!connectedDevice) {
        console.error("Error: No device connected.");
        return false;
    }

    try {
        const base64Message = Buffer.from(message, 'utf-8').toString('base64');
        await connectedDevice.writeCharacteristicWithResponseForService(
            SERVICE_UUID,
            CHARACTERISTIC_UUID,
            base64Message
        );
        console.log("Message sent:", message);
        return true; // Return success
    } catch (error) {
        console.error("Error sending message:", error);
        return false; // Return failure
    }
};

export const disconnectDevice = async (connectedDevice, setConnectedDevice) => {
    
    if (connectedDevice) {
        console.log("mtav!!!");
        await manager.cancelDeviceConnection(connectedDevice?.id)
        await connectedDevice.cancelConnection();
        setConnectedDevice([]);
        console.log("Disconnected from ESP32");
    }
};


// import RNBluetoothClassic from 'react-native-bluetooth-classic';
// const RNBluetoothClassic = require('react-native-bluetooth-classic').default;
// export async function scanDevices(setScannedDevices) {
//     console.log("RNBluetoothClassic:", RNBluetoothClassic);
//     console.log("Available functions:", Object.keys(RNBluetoothClassic));
//     try {
//         const devices = await RNBluetoothClassic.list();
//         console.log("Discovered Devices:", devices);
//         setScannedDevices(devices);
//     } catch (error) {
//         console.error("Error scanning:", error);
//     }
// }

// export async function connectToDevice(device, setConnectedDevice) {
//     try {
//         const connection = await device.connect();
//         console.log("Connected to Raspberry Pi:", connection);
//         setConnectedDevice(connection);
//     } catch (error) {
//         console.error("Connection error:", error);
//     }
// }

// export async function sendMessage(connectedDevice, message) {
//     if (!connectedDevice) {
//         console.error("No device connected");
//         return;
//     }

//     try {
//         await connectedDevice.write(message + "\n");
//         console.log("Message sent:", message);
//     } catch (error) {
//         console.error("Error sending message:", error);
//     }
// }