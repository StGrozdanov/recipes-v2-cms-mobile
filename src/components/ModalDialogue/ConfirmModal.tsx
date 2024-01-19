import { Text, View, TouchableOpacity } from "react-native";
import { useThemeContext } from "../../hooks/useThemeContext";
import ModalDialogue from "./ModalDialogue";
import { modalStyles } from "./ModalDialogueStyleSheet";

type ConfirmModalProps = {
    visible: boolean,
    message: string,
    triggerFunction: () => Promise<void>,
    setVisible: (value: boolean) => void,
}

export default function ConfirmModal({ visible, message, triggerFunction, setVisible }: ConfirmModalProps) {
    const { theme } = useThemeContext();

    return (
        <ModalDialogue visible={visible} >
            <Text style={modalStyles[theme + 'Message']}>{message}</Text>
            <View style={modalStyles.buttonsContainer}>
                <TouchableOpacity style={modalStyles.confirmButton} onPress={triggerFunction}>
                    <Text style={modalStyles.buttonText}>Потвърди</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modalStyles.cancelButton} onPress={() => setVisible(false)}>
                    <Text style={modalStyles.buttonText}>Отхвърли</Text>
                </TouchableOpacity>
            </View>
        </ModalDialogue>
    );
}