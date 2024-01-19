import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { useNavigation } from "@react-navigation/native";

export type EditActionProps = {
    collection: string,
    resourceId: string,
    setDropdownIsExpanded: (value: boolean) => void,
}

export default function EditAction({ collection, resourceId, setDropdownIsExpanded }: EditActionProps) {
    const navigator = useNavigation();

    function navigateHandler() {
        setDropdownIsExpanded(false);
        navigator.navigate(['Profile', { itemId: resourceId }] as never);
    }

    return (
        <TouchableOpacity style={actionStyles.action} onPress={navigateHandler}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faPenToSquare} />
            <Text style={actionStyles.text}>Edit {collection}</Text>
        </TouchableOpacity>
    );
}