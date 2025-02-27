import { BleManager } from 'react-native-ble-plx';

class BluetoothManager {
  manager;

  constructor() {
    this.manager = new BleManager();
  }

  scanForDevices(callback) {
    this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.manager.scan([], 5, true).then(() => {
          this.manager.onDiscoverPeripheral(callback);
        });
      }
    }, true);
  }

  // Other Bluetooth management methods...
}

export default new BluetoothManager();
