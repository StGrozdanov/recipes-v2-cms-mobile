import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { useState } from "react";
import ConfirmModal from "../ModalDialogue/ConfirmModal";
import { useRecipesService } from "../../services/recipesService";
import { useCommentService } from "../../services/commentService";
import { useUserService } from "../../services/userService";
import { useQueryClient } from "react-query";

const deleteMessages: Record<string, string> = {
    userModalMessage: 'Сигурни ли сте, че искате да изтриете този потребител?',
    recipeModalMessage: 'Сигурни ли сте, че искате да изтриете тази рецепта?',
    commentModalMessage: 'Сигурни ли сте, че искате да изтриете този коментар?',
}

type DeleteActionsProps = {
    collection: string,
    objectId: number,
    removeUser?: (resourceId: number) => void
    deleteFromTable: (resourceId: number) => void
    deleteComment?: (resourceId: number) => void
}

export default function DeleteAction({
    collection,
    objectId,
    removeUser,
    deleteFromTable,
    deleteComment,
}: DeleteActionsProps) {
    const [showModal, setShowModal] = useState(false);
    const queryClient = useQueryClient();
    const { useDeleteRecipe } = useRecipesService();
    const { useDeleteComment } = useCommentService();
    const { useDeleteUser } = useUserService();
    const { deleteComment: sendDeleteCommentRequest } = useDeleteComment();
    const { deleteRecipe: sendDeleteRecipeRequest } = useDeleteRecipe();
    const { deleteUser: sendDeleteUserRequest } = useDeleteUser();

    async function userDeleteHandler() {
        setShowModal(true);
        const { deleteUserResponse } = await sendDeleteUserRequest(objectId);
        await deleteUserResponse
        await queryClient.invalidateQueries(['users']);
        removeUser && removeUser(objectId);
    }

    async function recipeDeleteHandler() {
        setShowModal(true);
        const { deleteRecipeResponse } = await sendDeleteRecipeRequest(objectId);
        await deleteRecipeResponse; 
        await queryClient.invalidateQueries(['recipes']);
        deleteFromTable(objectId);
    }

    async function commentDeleteHandler() {
        setShowModal(true);
        const { deleteCommentResponse } = await sendDeleteCommentRequest(objectId);
        await deleteCommentResponse;
        await queryClient.invalidateQueries(['comments']);
        deleteComment && deleteComment(objectId);
    }

    const deleteHandlers: Record<string, () => Promise<void>> = {
        user: userDeleteHandler,
        recipe: recipeDeleteHandler,
        comment: commentDeleteHandler
    }

    return (
        <>
            <ConfirmModal
                visible={showModal}
                message={deleteMessages[collection + 'ModalMessage']}
                triggerFunction={deleteHandlers[collection]}
                setVisible={setShowModal}
            />
            <TouchableOpacity style={actionStyles.action} onPress={() => setShowModal(true)}>
                <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faTrashCan} />
                <Text style={actionStyles.text}>Delete {collection}</Text>
            </TouchableOpacity>
        </>
    );
}