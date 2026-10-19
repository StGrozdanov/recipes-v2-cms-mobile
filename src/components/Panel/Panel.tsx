import { View, Image } from "react-native";
import { adminPanel } from "./PanelStyleSheet";
import { useThemeContext } from "../../hooks/useThemeContext";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import { StatusBar } from "expo-status-bar";
import { NavigationBar } from 'expo-navigation-bar';
import { ContainerProps } from "../../contexts/types";
import { useNotificationsService } from "../../services/notificationsService";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRoute } from "@react-navigation/native";

export default function Panel({ children }: ContainerProps) {
    const { username } = useAuthContext();
    const { theme } = useThemeContext();
    const navigationRoute = useRoute();
    const { useGetUserNotifications } = useNotificationsService();
    const { notifications, notificationsAreLoading } = useGetUserNotifications(username);

    const androidNavAndStatusBarColors = theme === 'light' ? 'dark' : 'light';

    return (
        notificationsAreLoading
            ? <Image
                source={require('../../../assets/admin-panel-loading.gif')}
                style={{ position: 'absolute', top: '35%', width: '100%', height: '10%', }}
            />
            : <>
                <StatusBar style={androidNavAndStatusBarColors} />
                <NavigationBar style={androidNavAndStatusBarColors} />
                <View style={adminPanel[theme + 'Container']}>
                    <Header
                        notificationsCount={
                            notifications?.length && !navigationRoute.name.includes('Notifications')
                                ? notifications.length
                                : 0
                        }
                    />
                    {children}
                    <Navigation />
                </View>
            </>
    );
}