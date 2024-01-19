import { FlatList, Image, RefreshControl } from "react-native";
import { userStyles } from "../Users/UserStyleSheet";
import { useCallback, useEffect, useState } from "react";
import { summary } from "../../utils/contentSummary";
import { useSearchContext } from "../../hooks/useSearchContext";
import Table from "../Table/Table";
import SuccessModal from "../ModalDialogue/SuccessModal";
import { useRecipesService } from "../../services/recipesService";
import { useQueryClient } from "react-query";
import { RecipeData } from "@/services/types";

export default function Recipes() {
    const [refreshData, setRefreshData] = useState(false);
    const [recipeData, setRecipeData] = useState<RecipeData[]>();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { search } = useSearchContext();
    const { useGetAllRecipes } = useRecipesService();
    const { recipes, recipesAreLoading } = useGetAllRecipes();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (search.collection === 'Recipes') {
            setRecipeData(() => {
                return search.results.length > 0 ? recipes?.filter(recipe => search.results.includes(recipe.recipeName)) : []
            });
        } else {
            recipes?.map((recipe, index) => {
                recipe.Owner = recipe.ownerName;
                recipe.Location = recipe.recipeName;
                recipe.Status = recipe.status;
                recipe.Order = index;
                return recipe;
            })
            setRecipeData(recipes);
        }
    }, [search, recipes]);

    const onRefresh = useCallback(async () => {
        setRefreshData(true);
        await queryClient.invalidateQueries(['recipes']);
        setRefreshData(false);
    }, []);

    const removeRecipe = (recipeId: string) => setRecipeData(recipeData?.filter(recipe => recipe.recipeName !== recipeId));

    return (
        recipesAreLoading
            ? <Image
                source={require('../../../assets/admin-panel-loading.gif')}
                style={{ position: 'absolute', top: '35%', width: '100%', height: '10%', }}
            />
            : <>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
                    style={userStyles.container}
                    keyExtractor={item => item.recipeName}
                    data={recipeData}
                    renderItem={({ item }) => (
                        <Table
                            name={summary(item.recipeName, 20)}
                            pictureType='food'
                            pictureSource={item.imageURL}
                            data={item}
                            isEven={item.Order % 2 === 0}
                            approveAction={item.status === 'APPROVED' ? '' : 'recipe'}
                            deleteAction='recipe'
                            removeRecipe={removeRecipe}
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
