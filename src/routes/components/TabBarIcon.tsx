import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';

type Props = {
  focused: boolean;
  size: number;
  activeImage: ImageSourcePropType;
  inactiveImage: ImageSourcePropType;
  activeTintColor: string;
  inactiveTintColor: string;
};

export default function TabBarIcon(props: Props) {
  return (
    <Image
      source={props.focused ? props.activeImage : props.inactiveImage}
      style={
        props.focused
          ? {
              height: props.size,
              width: props.size,
              tintColor: props.activeTintColor,
            }
          : {
              height: props.size,
              width: props.size,
              tintColor: props.inactiveTintColor,
            }
      }
    />
  );
}
