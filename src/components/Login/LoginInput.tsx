import { useState } from "react";
import { TextInput, View } from "react-native";
import { loginStyles } from "./LoginStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';

type LoginInputProps = {
    placeholder: string,
    setFieldValue: React.Dispatch<React.SetStateAction<string>>,
    invalidInput: boolean,
}

export default function LoginInput({ placeholder, setFieldValue, invalidInput }: LoginInputProps) {
    const [inputIsFocused, setInputIsFocused] = useState(false);
    return (
        <View style={loginStyles.inputWrapper}>
            <TextInput
                style={[
                    loginStyles.input,
                    inputIsFocused && { borderBottomWidth: 2, borderBottomColor: 'white' },
                    invalidInput && { borderBottomColor: 'red' }
                ]}
                placeholder={placeholder}
                placeholderTextColor={invalidInput ? 'red' : 'white'}
                selectionColor='white'
                onFocus={() => setInputIsFocused(true)}
                onBlur={() => setInputIsFocused(false)}
                onChangeText={(text) => setFieldValue(text)}
                secureTextEntry={placeholder === 'Password'}
            />
            <FontAwesomeIcon
                style={{ color: 'white', position: 'absolute', top: 15, left: 0 }}
                icon={placeholder === 'Username' ? faUser : faKey}
                size={16}
            />
        </View>
    );
}