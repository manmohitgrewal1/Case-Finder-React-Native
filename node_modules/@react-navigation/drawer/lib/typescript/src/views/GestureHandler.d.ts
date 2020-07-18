import * as React from 'react';
import { View } from 'react-native';
import type { PanGestureHandlerProperties, TapGestureHandlerProperties } from 'react-native-gesture-handler';
export declare const PanGestureHandler: React.ComponentType<PanGestureHandlerProperties>;
export declare const TapGestureHandler: React.ComponentType<TapGestureHandlerProperties>;
export declare const GestureHandlerRootView: typeof View;
export declare const GestureState: {
    UNDETERMINED: number;
    FAILED: number;
    BEGAN: number;
    CANCELLED: number;
    ACTIVE: number;
    END: number;
};
export type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
