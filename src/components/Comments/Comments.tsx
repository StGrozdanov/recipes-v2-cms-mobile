import { FlatList, Image, RefreshControl } from "react-native";
import { userStyles } from "../Users/UserStyleSheet";
import { summary } from "../../utils/contentSummary";
import { useCallback, useEffect, useState } from "react";
import { useSearchContext } from "../../hooks/useSearchContext";
import Table from "../Table/Table";
import SuccessModal from "../ModalDialogue/SuccessModal";
import { CommentData } from "../../services/types";
import { useQueryClient } from "react-query";
import { useCommentService } from "../../services/commentService";

export default function Comments() {
    const [refreshData, setRefreshData] = useState(false);
    const [commentData, setCommentData] = useState<CommentData[]>();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { search } = useSearchContext();
    const { useGetAllComments } = useCommentService();
    const { comments, commentsAreLoading } = useGetAllComments();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (search.collection === 'Comments') {
            setCommentData(() => {
                return search.results.length > 0 ? comments?.filter(comment => search.results.includes(comment.content)) : []
            });
        } else {
            comments?.map((comment, index) => {
                comment.Owner = comment.owner.username;
                comment.Location = comment.recipeName;
                comment.Order = index;
                return comment;
            })
            setCommentData(comments);
        }
    }, [search]);

    const onRefresh = useCallback(async () => {
        setRefreshData(true);
        await queryClient.invalidateQueries(['comments']);
        setRefreshData(false);
    }, []);

    const removeComment = (commentId: number) => setCommentData(comments?.filter(comment => comment.id !== commentId));
    
    return (
        <>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
                style={userStyles.container}
                keyExtractor={item => item.Order + item.content + item.id}
                data={commentData}
                renderItem={({ item }) => (
                    <Table
                        name={summary(item.content, 20)}
                        pictureType='avatar'
                        pictureSource={item.owner.avatarURL}
                        data={item}
                        isEven={item.Order % 2 === 0}
                        blockAction='user'
                        deleteAction='comment'
                        removeComment={removeComment}
                        setSuccessMessage={setSuccessMessage}
                        setShowSuccessMessage={setShowSuccessMessage}
                    />
                )}
            />
            {
                commentsAreLoading &&
                <Image
                    source={require('../../../assets/admin-panel-loading.gif')}
                    style={{ position: 'absolute', top: '35%', width: '100%', height: '10%', }}
                />
            }
            <SuccessModal
                visible={showSuccessMessage}
                setVisible={setShowSuccessMessage}
                message={successMessage}
            />
        </>
    );
}