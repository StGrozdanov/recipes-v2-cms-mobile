import { Text, View, TouchableOpacity } from "react-native";
import { useThemeContext } from "../../hooks/useThemeContext";
import { modalStyles } from "./ModalDialogueStyleSheet";
import RadioButton from "../RadioButton/RadioButton";
import ModalDialogue from "./ModalDialogue";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { appearanceStyles } from '../Appearance/AppearanceStyleSheet';
import { Dispatch, SetStateAction } from "react";

type OptionsModalProps = {
    visible: boolean,
    selectedOption: string,
    message: string,
    setVisible: Dispatch<SetStateAction<boolean>>,
    options: string[],
    triggerFunction: {
        setCurrentRole: React.Dispatch<React.SetStateAction<string>>;
        setRoleChangeRequest: React.Dispatch<React.SetStateAction<boolean>>;
    }
}

export default function OptionsModal({
    visible,
    selectedOption,
    message,
    setVisible,
    options,
    triggerFunction
}: OptionsModalProps) {
    const { theme } = useThemeContext();
    return (
        <ModalDialogue visible={visible} >
            <TouchableOpacity style={modalStyles.xMark} onPress={() => setVisible(false)}>
                <FontAwesomeIcon
                    icon={faXmark}
                    size={17}
                    color={theme === 'light' ? 'rgba(124,113,192,1)' : 'floralwhite'} />
            </TouchableOpacity>
            <Text style={modalStyles[theme + 'Message']}>{message}</Text>
            <View style={modalStyles.optionsContainer}>
                {
                    options.map(option => {
                        return (
                            <TouchableOpacity
                                style={appearanceStyles.container}
                                onPress={() => {
                                    triggerFunction.setCurrentRole(option);
                                    triggerFunction.setRoleChangeRequest(true);
                                }}
                                key={option + option}
                            >
                                <RadioButton
                                    selected={selectedOption === option}
                                    text={option}
                                    textColor={modalStyles[theme + 'OptionsText']}
                                    optionColor={modalStyles[theme + 'OptionColor']}
                                    selectColor={modalStyles[theme + 'SelectColor']}
                                    key={option}

                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ModalDialogue>
    );
}