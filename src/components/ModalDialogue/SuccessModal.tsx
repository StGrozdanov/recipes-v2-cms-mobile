import { Text, View, TouchableOpacity, Image } from "react-native";
import { useThemeContext } from "../../hooks/useThemeContext";
import ModalDialogue from "./ModalDialogue";
import { modalStyles } from "./ModalDialogueStyleSheet";
import { Dispatch } from "react";

type SuccessModalProps = {
    visible: boolean,
    setVisible: Dispatch<React.SetStateAction<boolean>>,
    message: string,
}

export default function SuccessModal({ visible, message, setVisible }: SuccessModalProps) {
    const { theme } = useThemeContext();

    return (
        <ModalDialogue visible={visible} >
            <Text style={modalStyles[theme + 'Message']}>{message}</Text>
            <View style={{width: 90, height: 60, left: '33%', top: '15%'}}>
                <Image
                    source={require('../../../assets/success.png')}
                    style={{ width: '100%', height: '100%', }}
                />
            </View>
            <View style={modalStyles.buttonsContainer}>
                <TouchableOpacity style={modalStyles.confirmButton} onPress={() => setVisible(false)}>
                    <Text style={modalStyles.buttonText}>Затвори</Text>
                </TouchableOpacity>
            </View>
        </ModalDialogue>
    );
}