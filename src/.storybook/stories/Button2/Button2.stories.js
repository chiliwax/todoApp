import React from 'react';
import { View } from 'react-native';
import { MyButton2 } from './Button2';

const MyButtonMeta = {
  title: 'MyButton2',
  component: MyButton2,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    text: 'Hello world',
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default MyButtonMeta;

export const Basic = {};

export const AnotherExample = {
  args: {
    text: 'Another example',
  },
};
