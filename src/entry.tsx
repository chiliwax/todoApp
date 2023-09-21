import { registerRootComponent } from "expo";
import StoryBoardRootComponent from './.storybook';
import {App as ExpoRootComponent} from 'expo-router/_app'

const rootComponent = process.env.EXPO_PUBLIC_STORYBOOK_ENABLE === 'TRUE' ? StoryBoardRootComponent : ExpoRootComponent

registerRootComponent(rootComponent);

const routes = {
    home: '/',
    profile: '/profile'
} as const

type KeyOfRoutes = keyof typeof routes
type Routes = typeof routes [KeyOfRoutes]

const goToRoute = (route: Routes) => {

}


const LOG_LEVEL = {
    DEBUG: 'DEBUG',
    WARNING: 'WARNING'
} as const
type ObjectValue<T> = T[keyof T];
type LogLevel = ObjectValue<typeof LOG_LEVEL>

const log = (msg: string, logLevel: LogLevel) => {

}

log('hello', LOG_LEVEL.DEBUG)

