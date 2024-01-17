import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { loginStyles } from "./LoginStyleSheet";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useAuthService } from "../../services/authService";
import LoginInput from "./LoginInput";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidInput, setInvalidInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { userLogin } = useAuthContext();
    const { useLogin } = useAuthService();
    const { login, isLoading } = useLogin();
    const navigation = useNavigation();

    const loginHandler = async () => {
        if (username.trim() === '' || password.trim() === '') {
            indicateLoginError('All fields are required.')
            return;
        }

        setInvalidInput(false);
        setErrorMessage('');

        try {
            const { loginResponse } = await login({ username, password });
            const authData = await loginResponse;
            if (authData?.isAdministrator) {
                userLogin(authData);
                navigation.navigate('Dashboard' as never);
            } else {
                indicateLoginError('You don\'t have a permission to use this app.');
            }
        } catch (err) {
            indicateLoginError('Invalid username or password.');
        }
    }

    const indicateLoginError = (message: string) => {
        setInvalidInput(true);
        setErrorMessage(message);
    }

    return (
        <View style={loginStyles.container}>
            <ImageBackground
                source={require('../../../assets/gradient.jpg')}
                resizeMode='cover'
                style={loginStyles.background}
            >
                <Text style={loginStyles.heading}>Login.</Text>
                <Text style={loginStyles.secondHeading}>Welcome Back,</Text>
                <Text style={loginStyles.thirdHeading}>Sign in to continue</Text>
                <Text style={loginStyles.errorHeading}>{errorMessage}</Text>
                {isLoading &&
                    <Image
                        source={require('../../../assets/admin-panel-loading.gif')}
                        style={loginStyles.loadingSpinner}
                    />
                }
                <View style={loginStyles.formWrapper}>
                    <LoginInput placeholder='Username' setFieldValue={setUsername} invalidInput={invalidInput} />
                    <LoginInput placeholder='Password' setFieldValue={setPassword} invalidInput={invalidInput} />
                    <TouchableOpacity style={loginStyles.button} onPress={loginHandler}>
                        <Text style={loginStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}