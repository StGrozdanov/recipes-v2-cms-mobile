import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { ActionProps } from "./ApproveAction";
import { useQueryClient } from "react-query";
import { useUserService } from "../../services/userService";

export default function UnblockAction({
    collection,
    resourceId,
    setDropdownIsExpanded,
    setSuccessMessage,
    setShowSuccessMessage
}: ActionProps) {
    const queryClient = useQueryClient();
    const { useUnblockUser } = useUserService();
    const { unblockUser } = useUnblockUser();

    const unblockUserHandler = async () => {
        const { unblockUserResponse } = await unblockUser(resourceId);
        await unblockUserResponse;
        await queryClient.invalidateQueries(['users']);

        setDropdownIsExpanded(false);
        setSuccessMessage('Успешно отблокирахте потребителя');
        setShowSuccessMessage(true);
    }

    return (
        <>
            <TouchableOpacity style={actionStyles.action} onPress={unblockUserHandler}>
                <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faBan} />
                <Text style={actionStyles.text}>Unblock {collection}</Text>
            </TouchableOpacity>
        </>
    );
}