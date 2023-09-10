import { registerRootComponent } from "expo";
import StoryBoardRootComponent from './.storybook';
import {App as ExpoRootComponent} from 'expo-router/_app'

const rootComponent = process.env.EXPO_PUBLIC_STORYBOOK_ENABLE === 'TRUE' ? StoryBoardRootComponent : ExpoRootComponent

registerRootComponent(rootComponent);