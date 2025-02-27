import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const SERVICE_UUID = "0001";
const CHARACTERISTIC_UUID = "87654321-4321-6789-4321-098765abcdef";

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
            console.log(device.name);
            
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
        console.log("Connecting to device...");
        const connected = await manager.connectToDevice(device.id);
        console.log("charrr",manager.discoverAllServicesAndCharacteristicsForDevice(device.id))
        await connected.discoverAllServicesAndCharacteristics();
        sendMessage(connected,"hello\n")
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
        await connectedDevice.cancelConnection();
        setConnectedDevice(null);
        console.log("Disconnected from ESP32");
    }
};
