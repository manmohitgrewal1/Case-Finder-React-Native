import * as React from 'react';
import { ScrollViewProps } from 'react-native';
declare type Props = ScrollViewProps & {
    children: React.ReactNode;
};
export default function DrawerContentScrollView({ contentContainerStyle, style, children, ...rest }: Props): JSX.Element;
export {};
