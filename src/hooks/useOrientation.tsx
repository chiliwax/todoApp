import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";

export const useOrientation = () => {
  // #region states
  const [subscribeState, setSubscribeState] =
    useState<ScreenOrientation.Subscription>();
  // #endregion
  // #region function
  const subscribe = () => {
      const unsubscribe = ScreenOrientation.addOrientationChangeListener((event) => {
        const orientation = ScreenOrientation.Orientation[event.orientationInfo.orientation];
        console.log(
          "Orientation",
          `Orientation change to : ${orientation}`
        );
      })
      setSubscribeState(unsubscribe);
      return unsubscribe;
  };
  const unsubscribe = () => {
    if (subscribeState) {
      subscribeState.remove();
    }
    setSubscribeState(undefined);
  };
  // #endregion

  const lockPortrait = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
      console.log("Orientation", "lockPortrait");
    } catch (error) {
      console.log("Orientation", "lockPortrait", error);
    }
  };
  const lockPortraitUp = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      console.log("Orientation", "lockPortraitUp");
    } catch (error) {
      console.error("Orientation", "lockPortraitUp", error);
    }
  };
  const lockPortraitDown = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_DOWN
      );
      console.log("Orientation", "lockPortraitDown");
    } catch (error) {
      console.error("Orientation", "lockPortraitDown", error);
    }
  };
  const lockLandscape = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      console.log("Orientation", "lockLandscape");
    } catch (error) {
      console.error("Orientation", "lockLandscape", error);
    }
  };
  const lockLandscapeLeft = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
      console.log("Orientation", "lockLandscapeLeft");
    } catch (error) {
      console.error("Orientation", "lockLandscapeLeft", error);
    }
  };
  const lockLandscapeRight = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
      console.log("Orientation", "lockLandscapeRight");
    } catch (error) {
      console.error("Orientation", "lockLandscapeRight", error);
    }
  };
  const unlock = async () => {
    try {
      await ScreenOrientation.unlockAsync();
      console.log("Orientation", "unlock");
    } catch (error) {
      console.error("Orientation", "unlock", error);
    }
  };

  const getOrientation = async () => {
    try {
      return ScreenOrientation.getOrientationAsync();
    } catch (error) {
      console.error("Orientation", "getOrientation", error);
    }
  };

  return {
    subscribe,
    unsubscribe,
    lockPortrait,
    lockPortraitUp,
    lockPortraitDown,
    lockLandscape,
    lockLandscapeLeft,
    lockLandscapeRight,
    unlock,
    getOrientation,
  };
};
