import { Dispatch, useEffect, useState } from 'react';
import ActionsDropdown from '../ActionsDropdown/ActionsDropdown';
import TableHead from '../Table/TableHead/TableHead'
import TableBody from '../Table/TableBody/TableBody';
import { useRoute } from '@react-navigation/native';

type TableProps = {
    isEven: boolean,
    name: string,
    data: any,
    pictureType: string,
    pictureSource: string,
    deleteAction: string,
    editAction?: string,
    blockAction?: string,
    approveAction?: string,
    changeRoleAction?: boolean,
    removeUser?: (id: number) => void,
    removeRecipe?: (id: number) => void,
    removeComment?: (id: number) => void,
    setSuccessMessage: Dispatch<React.SetStateAction<string>>,
    setShowSuccessMessage: Dispatch<React.SetStateAction<boolean>>,
}

export default function Table({
    isEven,
    name,
    data,
    pictureType,
    pictureSource,
    deleteAction,
    editAction,
    blockAction,
    approveAction,
    changeRoleAction,
    removeUser,
    removeRecipe,
    removeComment,
    setSuccessMessage,
    setShowSuccessMessage,
}: TableProps) {
    const route = useRoute();
    const [isToggled, setIsToggled] = useState(false);
    const [dropdownIsExpanded, setDropdownIsExpanded] = useState(false);

    useEffect(() => {
        const itemId = route.params;
        setIsToggled(itemId === data.id);
    }, [route.params]);

    function toggleHandler() {
        if (isToggled) {
            setIsToggled(false);
            setDropdownIsExpanded(false);
        } else {
            setIsToggled(true);
        }
    }

    function optionsHandler() {
        if (dropdownIsExpanded) {
            setDropdownIsExpanded(false);
        } else {
            setDropdownIsExpanded(true);
            setIsToggled(true);
        }
    }

    return (
        <>
            <TableHead
                pictureSource={pictureSource}
                pictureType={pictureType}
                contentName={name}
                isEven={isEven}
                isToggled={isToggled}
                optionsHandler={optionsHandler}
                toggleHandler={toggleHandler}
            />
            <TableBody isToggled={isToggled} data={data} />
            {
                dropdownIsExpanded &&
                <ActionsDropdown
                    deleteAction={deleteAction}
                    editAction={editAction}
                    blockAction={blockAction}
                    approveAction={approveAction}
                    changeRoleAction={changeRoleAction}
                    objectId={data.id}
                    userRole={data.role}
                    removeUser={removeUser}
                    setDropdownIsExpanded={setDropdownIsExpanded}
                    userIsBlocked={data.blocked}
                    removeRecipe={removeRecipe}
                    removeComment={removeComment}
                    setSuccessMessage={setSuccessMessage}
                    setShowSuccessMessage={setShowSuccessMessage}
                />
            }
        </>
    );
}