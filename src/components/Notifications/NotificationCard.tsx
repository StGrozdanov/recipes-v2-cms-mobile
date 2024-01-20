import { TouchableOpacity, View, Image, Text, GestureResponderEvent } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { notificationStyles } from './NotificationsStyleSheet';
import { notificationConstants } from './constants';

type NotificationCardProps = {
    locationId: string,
    objectId: number,
    senderAvatar: string,
    senderName: string,
    createdAt: string,
    readHandler: (id: number, location: string, action: keyof typeof notificationConstants) => void,
    markAsReadHandler: (id: number, e: GestureResponderEvent) => void,
    action: keyof typeof notificationConstants,
}

export default function NotificationCard({
    action,
    locationId,
    objectId,
    senderAvatar,
    senderName,
    createdAt,
    readHandler,
    markAsReadHandler,
}: NotificationCardProps) {
    return (
        <TouchableOpacity onPress={() => readHandler(objectId, locationId, action)}>
            <View style={notificationStyles.section} >
                <View style={notificationStyles.leftUserSectionContent}>
                    {
                        senderAvatar && senderAvatar !== 'null'
                            ? <Image
                                source={{ uri: senderAvatar }}
                                style={notificationStyles.avatar}
                            />
                            : <Image
                                style={notificationStyles.avatar}
                                source={require('../../../assets/avatar.png')}
                            />
                    }
                    <Text style={notificationStyles.text}>
                        <Text style={notificationStyles.sender}>{senderName + ' '}</Text>
                        {action + ', ' + createdAt.replace('T', ', ').substring(5, 17) + ' '}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[notificationStyles.rightUserSectionContent]}
                    onPress={(e) => markAsReadHandler(objectId, e)}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        style={notificationStyles.text}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}