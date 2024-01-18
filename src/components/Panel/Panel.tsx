import { View } from "react-native";
import { adminPanel } from "./PanelStyleSheet";
import { useThemeContext } from "../../hooks/useThemeContext";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from 'expo-navigation-bar';
import * as Device from 'expo-device';
import { ContainerProps } from "../../contexts/types";

export default function Panel({ children }: ContainerProps) {
    const { theme } = useThemeContext();

    const androidNavAndStatusBarColors = theme === 'light' ? 'dark' : 'light';

    if (Device.brand !== 'Apple') {
        const androidNavBarBackground = theme === 'light' ? '#EFEEFE' : 'black';
        NavigationBar.setBackgroundColorAsync(androidNavBarBackground);
        NavigationBar.setButtonStyleAsync(androidNavAndStatusBarColors);
    };

    return (
        <>
            <StatusBar
                backgroundColor={theme === 'light' ? "#EFEEFE" : "rgba(124,113,192,0.9)"}
                style={androidNavAndStatusBarColors}
            />
            <View style={adminPanel[theme + 'Container']}>
                <Header notificationsCount={0} />
                {children}
                <Navigation />
            </View>
        </>
    );
}