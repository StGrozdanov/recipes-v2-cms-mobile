import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
// import { unblockUser } from "../../services/userService";
import { ActionProps } from "./ApproveAction";

export default function UnblockAction({ 
    collection, 
    // resourceId, 
    setDropdownIsExpanded, 
    setSuccessMessage, 
    setShowSuccessMessage 
}: ActionProps) {    
    async function unblockUserHandler() {
        // await unblockUser(resourceId);
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