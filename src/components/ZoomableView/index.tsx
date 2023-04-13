import React, { createRef, useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import { styles } from "./zoomableScroolView.styles";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const ZoomView = ({ children }) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const savedScale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinchRef = createRef();
  const panRef = createRef();

  type ContextType = {
    translateX: number;
    translateY: number;
  };
  const MIN_X = -width*2;
  const MAX_X = 100;
  const onPanEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
    //  translateX.value = Math.min(Math.max(context.translateX + event.translationX, MIN_X), MAX_X);
    
      translateX.value = context.translateX + event.translationX;
      translateY.value = context.translateY + event.translationY;
    },
  });

  const onPinchEvent = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent, ContextType>({
    onActive: (event, context) => {
      scale.value = savedScale.value * event.scale;
    },
    onEnd: (event) => {
      if (scale.value < 0.33) {
        scale.value = withSpring(0.33);
      }
      savedScale.value = scale.value;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
  });

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
    };
  });
  return (
    <View style={styles.conteiner}>
      <PanGestureHandler
        ref={panRef}
        minPointers={1}
        maxPointers={1}
        onGestureEvent={onPanEvent}
        simultaneousHandlers={[pinchRef]}
      >
        <Animated.View>
          <PinchGestureHandler ref={pinchRef} onGestureEvent={onPinchEvent} simultaneousHandlers={[pinchRef]}>
            <Animated.View style={animationStyle}>{children}</Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ZoomView;
