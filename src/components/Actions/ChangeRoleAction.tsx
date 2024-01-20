import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons/faPeopleArrowsLeftRight';
import OptionsModal from "../ModalDialogue/OptionsModal";
import { useCallback, useEffect, useState } from "react";
import { useUserService } from "../../services/userService";
import { useQueryClient } from "react-query";

const changeRoleMessage = 'Изберете роля за потребителя'
const roleChoices = ['ADMINISTRATOR', 'MODERATOR', 'USER'];

type RoleActionProps = {
    userRole: string,
    userId: number,
}

export default function ChangeRoleAction({
    userRole,
    userId
}: RoleActionProps) {
    const [showModal, setShowModal] = useState(false);
    const [currentRole, setCurrentRole] = useState(userRole);
    const [roleChangeRequest, setRoleChangeRequest] = useState(false);
    const { useUpdateRole } = useUserService();
    const { changeRole } = useUpdateRole();
    const queryClient = useQueryClient()

    useEffect(() => {
        if (roleChangeRequest) {
            updateUserRoleHandler();
        }
    }, [currentRole]);

    const updateUserRoleHandler = useCallback(async () => {
        const { updateUserRoleResponse } = await changeRole({ role: currentRole, userId });
        await updateUserRoleResponse;
        await queryClient.invalidateQueries(['users']);
    }, [currentRole]);

    return (
        <>
            <OptionsModal
                message={changeRoleMessage}
                options={roleChoices}
                selectedOption={currentRole}
                setVisible={setShowModal}
                visible={showModal}
                triggerFunction={{ setCurrentRole, setRoleChangeRequest }}
            />
            <TouchableOpacity style={actionStyles.action} onPress={() => setShowModal(true)}>
                <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faPeopleArrowsLeftRight} />
                <Text style={actionStyles.text}>Change user role</Text>
            </TouchableOpacity>
        </>
    );
}