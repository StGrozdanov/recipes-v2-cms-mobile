import { TouchableOpacity, Text, TextInput, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { useState } from "react";
import { modalStyles } from "../ModalDialogue/ModalDialogueStyleSheet";
import { useThemeContext } from "../../hooks/useThemeContext";
import ModalDialogue from "../ModalDialogue/ModalDialogue";
import { ActionProps } from "./ApproveAction";
import { useUserService } from "../../services/userService";
import { useQueryClient } from "react-query";

export default function BlockAction({
    collection,
    resourceId,
    setDropdownIsExpanded,
    setSuccessMessage,
    setShowSuccessMessage
}: ActionProps) {
    const [showModal, setShowModal] = useState(false);
    const [inputIsFocused, setInputIsFocused] = useState(false);
    const [reason, setReason] = useState('');
    const { theme } = useThemeContext();
    const { useBlockUser } = useUserService();
    const { blockUser } = useBlockUser();
    const queryClient = useQueryClient();

    async function blockUserHandler() {
        const { blockUserResponse } = await blockUser({ userId: resourceId, reason });
        await blockUserResponse;
        await queryClient.invalidateQueries(['users']);
        setShowModal(false);
        setDropdownIsExpanded(false);
        setShowSuccessMessage(true);
        setSuccessMessage('Успешно блокирахте потребителя.');
    }

    return (
        <>
            <ModalDialogue visible={showModal} >
                <TouchableOpacity style={modalStyles.xMark} onPress={() => setShowModal(false)}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        size={17}
                        color={theme === 'light' ? 'rgba(124,113,192,1)' : 'floralwhite'} />
                </TouchableOpacity>
                <Text style={modalStyles[theme + 'Message']}>
                    Посочете причината за блокиране на потребителя
                </Text>
                <TextInput
                    style={[
                        modalStyles[theme + 'Input'],
                        inputIsFocused && {
                            borderBottomWidth: 2,
                            borderBottomColor: theme === 'light'
                                ? 'rgba(124,113,192,0.9)'
                                : 'floralwhite'
                        },
                    ]}
                    placeholder='причина...'
                    placeholderTextColor={theme === 'light' ? '#000' : 'floralwhite'}
                    selectionColor={theme === 'light' ? 'rgba(124,113,192,0.9)' : 'floralwhite'}
                    onFocus={() => setInputIsFocused(true)}
                    onBlur={() => setInputIsFocused(false)}
                    onChangeText={(text) => setReason(text)}
                />
                <TouchableOpacity style={modalStyles.buttonsContainer} onPress={blockUserHandler}>
                    <View
                        style={[
                            modalStyles.confirmButton,
                            { backgroundColor: theme === 'light' ? 'rgba(124,113,192,0.9)' : 'floralwhite' }
                        ]}
                    >
                        <Text
                            style={theme === 'light' ? modalStyles.buttonText : { color: 'rgba(124,113,192,0.9)' }}
                        >
                            Потвърди
                        </Text>
                    </View>
                </TouchableOpacity>
            </ModalDialogue>
            <TouchableOpacity style={actionStyles.action} onPress={() => setShowModal(true)}>
                <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faBan} />
                <Text style={actionStyles.text}>Block {collection}</Text>
            </TouchableOpacity>
        </>
    );
}