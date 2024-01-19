import { Text, View, Image } from 'react-native';
import { userCardStyles } from './UserCardStyleSheet';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBowlRice } from '@fortawesome/free-solid-svg-icons/faBowlRice';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { useThemeContext } from "../../hooks/useThemeContext";
import { useRoute, RouteProp } from '@react-navigation/native';
import { useUserService } from '../../services/userService';
import { useEffect, useState } from 'react';
import { UserData } from '../../services/types';

export default function UserProfile() {
    const { theme } = useThemeContext();
    const route: RouteProp<{ params: { itemId: string } }, 'params'> = useRoute();
    const { useGetAllUsers } = useUserService();
    const { users } = useGetAllUsers();
    const [userData, setUserData] = useState<UserData>();

    useEffect(() => {
        if (users) {
            setUserData(users.find(user => user.username === route.params.itemId));
        }
    }, [users, route]);

    return (
        <View style={[userCardStyles[theme + 'Card'], userCardStyles.randomStyle]}>
            <View style={userCardStyles[theme + 'CardTextSection']} />
            <View style={userCardStyles[theme + 'AvatarContainer']}>
                {userData?.avatarURL && userData.avatarURL !== '/avatar.png'
                    ? <Image
                        source={{ uri: userData.avatarURL }}
                        style={userCardStyles.avatar}
                    />
                    : <Image style={userCardStyles.avatar} source={require('../../../assets/avatar.png')} />
                }
            </View>
            <View style={userCardStyles.cardMainSection}>
                <Text style={userCardStyles[theme + 'UsernameContainer']}>{userData?.username}</Text>
                <View style={userCardStyles.publicationStats}>
                    <View>
                        <FontAwesomeIcon icon={faBowlRice} style={userCardStyles.icons} size={30} />
                        <Text
                            style={[userCardStyles[theme + 'Title'], userCardStyles.publicationsCounts]}
                        >
                            {userData?.createdRecipesCount} created
                        </Text>
                    </View>
                    <View>
                        <FontAwesomeIcon icon={faEnvelope} style={userCardStyles.icons} size={30} />
                        <Text
                            style={[userCardStyles[theme + 'Title'], userCardStyles.publicationsCounts]}
                        >
                            {userData?.email}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}