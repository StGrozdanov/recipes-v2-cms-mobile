import { FlatList, Image, RefreshControl } from "react-native";
import { userStyles } from "./UserStyleSheet";
import Table from "../Table/Table";
import { useCallback, useEffect, useState } from "react";
import { useSearchContext } from "../../hooks/useSearchContext";
import SuccessModal from "../ModalDialogue/SuccessModal";
import { useUserService } from "../../services/userService";
import { UserData } from "../../services/types";
import { useQueryClient } from "react-query";

export default function Users() {
    const [refreshData, setRefreshData] = useState(false);
    const [userData, setUserData] = useState<UserData[]>();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { search } = useSearchContext();
    const { useGetAllUsers } = useUserService();
    const { users, usersAreLoading } = useGetAllUsers();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (search.collection === 'Users') {
            setUserData(() => {
                return search.results.length > 0 ? users?.filter(user => search.results.includes(user.username)) : []
            });
        } else {
            users?.map((user, index) => {
                user.Profile = user.username;
                user.Status = 'offline';
                user.Order = index;
                return user;
            })
            setUserData(users);
        }
    }, [search, users]);

    const removeUser = (userId: string) => setUserData(userData?.filter(user => user.username !== userId));

    const onRefresh = useCallback(async () => {
        setRefreshData(true);
        await queryClient.invalidateQueries(['users']);
        setRefreshData(false);
    }, []);

    return (
        usersAreLoading
            ? <Image
                source={require('../../../assets/admin-panel-loading.gif')}
                style={{ position: 'absolute', top: '35%', width: '100%', height: '10%', }}
            />
            : <>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
                    style={userStyles.container}
                    keyExtractor={item => item.username}
                    data={userData}
                    renderItem={({ item }) => (
                        <Table
                            name={item.username}
                            pictureSource={item.avatarURL}
                            pictureType='avatar'
                            data={item}
                            isEven={item.Order % 2 === 0}
                            blockAction='user'
                            changeRoleAction
                            deleteAction='user'
                            editAction='user'
                            removeUser={removeUser}
                            setSuccessMessage={setSuccessMessage}
                            setShowSuccessMessage={setShowSuccessMessage}
                        />
                    )}
                />
                <SuccessModal
                    visible={showSuccessMessage}
                    setVisible={setShowSuccessMessage}
                    message={successMessage}
                />
            </>
    );
}