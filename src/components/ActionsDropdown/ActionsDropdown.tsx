import { TouchableOpacity } from "react-native";
import { actionsDropdownStyles } from "./ActionsDropdownStyleSheet";
import DeleteAction from '../Actions/DeleteAction'
import EditAction from '../Actions/EditAction'
import ChangeRoleAction from '../Actions/ChangeRoleAction'
import BlockAction from '../Actions/BlockAction'
import ApproveAction from '../Actions/ApproveAction'
import UnblockAction from "../Actions/UnblockAction";
import { Dispatch } from "react";

type ActionsDropdownProps = {
    deleteAction: string,
    editAction?: string,
    blockAction?: string,
    approveAction?: string,
    changeRoleAction?: boolean,
    removeUser?: (id: string) => void,
    removeRecipe?: (id: string) => void,
    removeComment?: (id: number) => void,
    setSuccessMessage: Dispatch<React.SetStateAction<string>>,
    setShowSuccessMessage: Dispatch<React.SetStateAction<boolean>>,
    objectId: number,
    setDropdownIsExpanded: Dispatch<React.SetStateAction<boolean>>,
    userIsBlocked?: boolean,
    userRole?: string,
}

export default function ActionsDropdown({
    blockAction,
    editAction,
    deleteAction,
    changeRoleAction,
    approveAction,
    objectId,
    removeUser,
    setDropdownIsExpanded,
    userRole,
    userIsBlocked,
    removeRecipe,
    removeComment,
    setSuccessMessage,
    setShowSuccessMessage,
}: ActionsDropdownProps) {
    return (
        <TouchableOpacity style={actionsDropdownStyles.container} >
            {
                deleteAction &&
                <DeleteAction
                    collection={deleteAction}
                    objectId={objectId}
                    removeUser={removeUser}
                    deleteFromTable={removeRecipe!}
                    deleteComment={removeComment}
                />
            }
            {
                editAction &&
                <EditAction
                    collection={editAction}
                    resourceId={objectId}
                    setDropdownIsExpanded={setDropdownIsExpanded}
                />
            }
            {
                changeRoleAction &&
                <ChangeRoleAction
                    userId={objectId}
                    userRole={userRole!}
                />
            }
            {
                blockAction && !userIsBlocked &&
                <BlockAction
                    collection={blockAction}
                    resourceId={objectId}
                    setDropdownIsExpanded={setDropdownIsExpanded}
                    setSuccessMessage={setSuccessMessage}
                    setShowSuccessMessage={setShowSuccessMessage}
                />
            }
            {
                blockAction && userIsBlocked &&
                <UnblockAction
                    collection={blockAction}
                    resourceId={objectId}
                    setDropdownIsExpanded={setDropdownIsExpanded}
                    setSuccessMessage={setSuccessMessage}
                    setShowSuccessMessage={setShowSuccessMessage}
                />
            }
            {
                approveAction &&
                <ApproveAction
                    collection={approveAction}
                    resourceId={objectId}
                    setDropdownIsExpanded={setDropdownIsExpanded}
                    setSuccessMessage={setSuccessMessage}
                    setShowSuccessMessage={setShowSuccessMessage}
                />
            }
        </TouchableOpacity>
    );
}