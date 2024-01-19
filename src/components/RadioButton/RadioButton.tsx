import { View, Text } from "react-native";
import { radioButtonStyles } from "./RadioButtonStyleSheet";
import { useThemeContext } from "../../hooks/useThemeContext";

type RadioButtonProps = {
    text: string,
    selected: boolean,
    textColor?: string,
    optionColor?: string,
    selectColor?: string,
}

export default function RadioButton({
    text,
    selected,
    textColor,
    optionColor,
    selectColor
}: RadioButtonProps) {
    const { theme } = useThemeContext();

    return (
        <View style={radioButtonStyles.container}>
            <View style={optionColor ? optionColor : radioButtonStyles[theme + 'Wrapper']}>
                {
                    selected &&
                    <View style={selectColor ? selectColor : radioButtonStyles.selected} />
                }
            </View>
            <Text style={textColor ? textColor : radioButtonStyles[theme + 'Text']}>{text}</Text>
        </View>
    );
}