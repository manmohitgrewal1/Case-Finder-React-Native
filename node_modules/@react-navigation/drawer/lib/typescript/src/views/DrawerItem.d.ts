import * as React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
declare type Props = {
    /**
     * The label text of the item.
     */
    label: string | ((props: {
        focused: boolean;
        color: string;
    }) => React.ReactNode);
    /**
     * Icon to display for the `DrawerItem`.
     */
    icon?: (props: {
        focused: boolean;
        size: number;
        color: string;
    }) => React.ReactNode;
    /**
     * URL to use for the link to the tab.
     */
    to?: string;
    /**
     * Whether to highlight the drawer item as active.
     */
    focused?: boolean;
    /**
     * Function to execute on press.
     */
    onPress: () => void;
    /**
     * Color for the icon and label when the item is active.
     */
    activeTintColor?: string;
    /**
     * Color for the icon and label when the item is inactive.
     */
    inactiveTintColor?: string;
    /**
     * Background color for item when its active.
     */
    activeBackgroundColor?: string;
    /**
     * Background color for item when its inactive.
     */
    inactiveBackgroundColor?: string;
    /**
     * Style object for the label element.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Style object for the wrapper element.
     */
    style?: StyleProp<ViewStyle>;
};
/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 */
export default function DrawerItem(props: Props): JSX.Element;
export {};
