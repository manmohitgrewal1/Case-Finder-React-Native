import * as React from 'react';
import { DrawerNavigationState } from '@react-navigation/native';
import type { DrawerNavigationHelpers, DrawerDescriptorMap, DrawerContentOptions } from '../types';
declare type Props = Omit<DrawerContentOptions, 'contentContainerStyle' | 'style'> & {
    state: DrawerNavigationState;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
};
/**
 * Component that renders the navigation list in the drawer.
 */
export default function DrawerItemList({ state, navigation, descriptors, activeTintColor, inactiveTintColor, activeBackgroundColor, inactiveBackgroundColor, itemStyle, labelStyle, }: Props): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export {};
