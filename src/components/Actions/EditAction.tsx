import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useUserService } from "../../services/userService";

export type EditActionProps = {
    collection: string,
    resourceId: number,
    setDropdownIsExpanded: (value: boolean) => void,
}

export default function EditAction({ collection, resourceId, setDropdownIsExpanded }: EditActionProps) {
    const { dispatch } = useNavigation();
    const { useGetAllUsers } = useUserService();
    const { users } = useGetAllUsers();

    function navigateHandler() {
        setDropdownIsExpanded(false);
        const location = users?.find(user => user.id === resourceId);
        dispatch(CommonActions.navigate({ name: 'Profile', params: { itemId: location?.username } }))
    }

    return (
        <TouchableOpacity style={actionStyles.action} onPress={navigateHandler}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faPenToSquare} />
            <Text style={actionStyles.text}>Edit {collection}</Text>
        </TouchableOpacity>
    );
}