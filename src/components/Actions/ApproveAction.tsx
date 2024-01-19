import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons/faFileCircleCheck';
// import { approveRecipe } from "../../services/recipeService";

export type ActionProps = {
    collection: string,
    resourceId: number,
    setDropdownIsExpanded: (value: boolean) => void,
    setShowSuccessMessage: (value: boolean) => void,
    setSuccessMessage: (value: string) => void,
}

export default function ApproveAction({
    collection,
    // resourceId,
    setDropdownIsExpanded,
    setShowSuccessMessage,
    setSuccessMessage,
}: ActionProps) {

    async function approveRecipeHandler() {
        // await approveRecipe(resourceId);
        setDropdownIsExpanded(false);
        setSuccessMessage('Успешно одобрихте рецептата');
        setShowSuccessMessage(true);
    }
    return (
        <TouchableOpacity style={actionStyles.action} onPress={approveRecipeHandler}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faFileCircleCheck} />
            <Text style={actionStyles.text}>Approve {collection}</Text>
        </TouchableOpacity>
    );
}