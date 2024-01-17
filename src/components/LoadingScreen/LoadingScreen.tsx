import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, ImageBackground, Image, Text } from 'react-native';
import { useAuthContext } from '../../hooks/useAuthContext';
import { loadingScreenStyles } from './LoadingScreenStyleSheet';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function LoadingScreen() {
    const { isAuthenticated } = useAuthContext();
    const navigation = useNavigation();

    useEffect(() => {
        const route = isAuthenticated ? 'Dashboard' : 'Login';
        navigation.navigate(route as never);
    }, [isAuthenticated]);

    return (
        <View style={loadingScreenStyles.container}>
            <ImageBackground
                source={require('../../../assets/gradient.jpg')}
                resizeMode='cover'
                style={loadingScreenStyles.background}
            >
                <Text style={loadingScreenStyles.heading}>Recipes Administrate</Text>
                <Image
                    source={require('../../../assets/cooking.png')}
                    style={loadingScreenStyles.logo}
                />
                <LoadingSpinner />
            </ImageBackground>
        </View>
    );
}