import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BatteryInfoContextProps, BatteryInfoContextProviderProps } from './BatteryInfoContext.props';
import * as Battery from 'expo-battery';

export const BatteryInfoContext = createContext<BatteryInfoContextProps>({} as BatteryInfoContextProps);

export const BatteryInfoContextProvider: React.FC<BatteryInfoContextProviderProps> = (props) => {
  const contextName = useMemo(() => BatteryInfoContextProvider.name, []);

  const [batteryLevel, setBatteryLevel] = useState<number>();
  const [batteryState, setBatteryState] = useState<Battery.BatteryState>();
  const [batteryMode, setBatteryMode] = useState<boolean>();

  const log = useCallback((...Args: any) => {
    if (props.debug) {
      console.log(...Args);
    }
  }, []);

  useEffect(() => {
    const _Subscriptions: Array<Battery.Subscription> = [];
    (async () => {
      const states = await Battery.getPowerStateAsync();
      setBatteryLevel(states.batteryLevel);
      setBatteryState(states.batteryState);
      setBatteryMode(states.lowPowerMode);

      _Subscriptions.push(
        Battery.addBatteryLevelListener(
          (e) => e && setBatteryLevel(e.batteryLevel)
        )
      );
      _Subscriptions.push(
        Battery.addBatteryStateListener(
          (e) => e && setBatteryState(e.batteryState)
        )
      );
      _Subscriptions.push(
        Battery.addLowPowerModeListener(
          (e) => e && setBatteryMode(e.lowPowerMode)
        )
      );
    })();

    return () => _Subscriptions.forEach((sub) => sub.remove());
  }, []);

  useEffect(() => {
    batteryLevel &&
      log(`[${contextName}] Battery Level : ${batteryLevel * 100}%`);
  }, [batteryLevel]);

  useEffect(() => {
    batteryState &&
      log(
        `[${contextName}] Battery State : ${Battery.BatteryState[batteryState]}`
      );      
  }, [batteryState]);

  useEffect(() => {
    typeof batteryMode === 'boolean' &&
      log(`[${contextName}] Low Power Mode : ${batteryMode}`);
  }, [batteryMode]);

  const contextValue: BatteryInfoContextProps = {
    batteryLevel: batteryLevel,
    batteryState: batteryState,
    lowPowerMode: batteryMode,
  };

  return (
    <BatteryInfoContext.Provider value={contextValue}>
      {props.children}
    </BatteryInfoContext.Provider>
  );
};
