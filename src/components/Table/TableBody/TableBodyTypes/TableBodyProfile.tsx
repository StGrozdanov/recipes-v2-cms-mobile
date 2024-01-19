import { View, Text, TouchableOpacity } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons/faShareFromSquare";
import { useThemeContext,  } from "../../../../hooks/useThemeContext";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { PointerProps } from "./TableBodyLocation";

export default function Profile({ pointer }: PointerProps) {
    const { theme } = useThemeContext();
    const { dispatch } = useNavigation();

    return (
        <View>
            <Text style={[tableBodyStyles[theme + 'AdditionalDataHeading']]}>Profile</Text>
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