import { View, Text, TouchableOpacity } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons/faLocationArrow";
import { useThemeContext } from "../../../../hooks/useThemeContext";
import { useOuterURL } from "../../../../hooks/useOuterURL";

export type PointerProps = {
    pointer: string,
}

export default function Location({ pointer }: PointerProps) {
    const { theme } = useThemeContext();
    const { setURLHandler } = useOuterURL();

    return (
        <View>
            <Text style={[tableBodyStyles[theme + 'AdditionalDataHeading']]}>Location</Text>
            <TouchableOpacity onPress={() => setURLHandler(`https://all-the-best-recipes.vercel.app/details/${pointer}`)}>
                <FontAwesomeIcon icon={faLocationArrow} style={tableBodyStyles[theme + 'Icons']} size={18} />
            </TouchableOpacity>
        </View>
    );
}