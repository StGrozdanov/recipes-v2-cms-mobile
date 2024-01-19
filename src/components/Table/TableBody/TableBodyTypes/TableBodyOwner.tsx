import { View, Text, TouchableOpacity } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons/faShareFromSquare";
import { useThemeContext } from "../../../../hooks/useThemeContext";
import { PointerProps } from "./TableBodyLocation";
import { useNavigation, CommonActions } from "@react-navigation/native";

export default function Owner({ pointer }: PointerProps) {
    const { theme } = useThemeContext();
    const { dispatch } = useNavigation();

    return (
        <View>
            <Text style={[tableBodyStyles[theme + 'AdditionalDataHeading']]}>Owner</Text>
            <TouchableOpacity
                onPress={() =>
                    dispatch(CommonActions.navigate({ name: 'Profile', params: { itemId: pointer } }))
                }
            >
                <FontAwesomeIcon icon={faShareFromSquare} style={tableBodyStyles[theme + 'Icons']} size={20} />
            </TouchableOpacity>
        </View>
    );
}