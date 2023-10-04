import * as Battery from 'expo-battery';

export interface BatteryInfoContextProps {
  batteryLevel?: number;
  batteryState?: Battery.BatteryState;
  lowPowerMode?: boolean;
}

export interface BatteryInfoContextProviderProps {
  children?: React.ReactNode;
  debug?: boolean;
}
