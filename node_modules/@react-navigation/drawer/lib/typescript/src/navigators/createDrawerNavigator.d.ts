import { DefaultNavigatorOptions, DrawerNavigationState, DrawerRouterOptions } from '@react-navigation/native';
import type { DrawerNavigationOptions, DrawerNavigationConfig, DrawerNavigationEventMap } from '../types';
declare type Props = DefaultNavigatorOptions<DrawerNavigationOptions> & DrawerRouterOptions & DrawerNavigationConfig;
declare function DrawerNavigator({ initialRouteName, openByDefault, backBehavior, children, screenOptions, ...rest }: Props): JSX.Element;
declare const _default: <ParamList extends Record<string, object | undefined>>() => import("@react-navigation/native").TypedNavigator<ParamList, DrawerNavigationState, DrawerNavigationOptions, DrawerNavigationEventMap, typeof DrawerNavigator>;
export default _default;
