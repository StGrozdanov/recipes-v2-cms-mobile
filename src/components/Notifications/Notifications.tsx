import { FlatList, GestureResponderEvent, RefreshControl, Text } from "react-native";
import { notificationStyles } from "./NotificationsStyleSheet";
import { useCallback, useState } from "react";
import NotificationCard from './NotificationCard';
import { useNavigation, CommonActions } from "@react-navigation/native";
import { notificationConstants } from "./constants";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotificationsService } from "../../services/notificationsService";
import { useQueryClient } from "react-query";

export default function Notifications() {
    const [refreshData, setRefreshData] = useState(false);
    const { dispatch, navigate } = useNavigation();
    const { username } = useAuthContext();
    const { useGetUserNotifications, useMarkAsRead } = useNotificationsService();
    const { notifications } = useGetUserNotifications(username);
    const { markAsRead } = useMarkAsRead();
    const queryClient = useQueryClient();

    const markAsReadHandler = async (id: number, e: GestureResponderEvent) => {
        e.stopPropagation();
        await markAsRead(id);
        await queryClient.invalidateQueries(['userNotifications', username]);
    };

    const readHandler = async (id: number, location: string, action: keyof typeof notificationConstants) => {
        await markAsRead(id);
        await Promise.all([
            queryClient.invalidateQueries(['userNotifications', username]),
            queryClient.invalidateQueries(['recipes']),
            queryClient.invalidateQueries(['comments']),
        ])
        action.includes('коментар')
            ? navigate('Comments' as never)
            : dispatch(CommonActions.navigate({ name: 'Recipes', params: { itemId: location } }))
    };

    const onRefresh = useCallback(async () => {
        setRefreshData(true);
        await queryClient.invalidateQueries(['userNotifications', username]);
        setRefreshData(false);
    }, []);

    return (
        notifications && notifications.length > 0
            ? <FlatList
                refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
                style={notificationStyles.container}
                keyExtractor={item => item.createdAt + item.id + item.action}
                data={notifications}
                renderItem={({ item }) => (
                    <NotificationCard
                        action={notificationConstants[item.action]}
                        createdAt={item.createdAt}
                        locationId={item.locationName}
                        objectId={item.id}
                        senderAvatar={item.senderAvatar}
                        senderName={item.senderUsername}
                        markAsReadHandler={markAsReadHandler}
                        readHandler={readHandler}
                    />
                )}
            />
            : <Text style={notificationStyles.noNotificationsText}>Нямате нови нотификации</Text>
    );
}