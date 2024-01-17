import { useQueries } from "react-query";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { BASE_URL, ChartDataFormat } from "./types";
import { UserCardProps } from "@/components/UserCard/UserCard";

/**
 * Used to fetch all the analytics data needed to be visualised on the dashbaord
 */
export const useDashboardData = () => {
    const { authGET } = useRequestHandler();

    const [
        { data: totalRecipesData, error: recipesFetchError, isFetching: recipesAreLoading },
        { data: totalCommentsData, error: commentsFetchError, isFetching: commentsAreLoading },
        { data: totalUsersData, error: usersFetchError, isFetching: usersAreLoading },
        { data: visitationsForTheLastSixMonthsData, error: visitationsFetchError, isFetching: visitationsAreLoading },
        { data: visitationsForTodayData, error: visitationsForTodayFetchError, isFetching: visitationsForTodayAreLoading },
        { data: mostActiveUserData, error: mostActiveUserFetchError, isFetching: mostActiveUserIsFetching },
    ] = useQueries([
        {
            queryKey: 'totalRecipesData',
            queryFn: (): Promise<{ count: number }> => authGET(`${BASE_URL}/recipes/count`),
        },
        {
            queryKey: 'totalCommentsData',
            queryFn: (): Promise<{ count: number }> => authGET(`${BASE_URL}/comments/count`),
        },
        {
            queryKey: 'totalUsersData',
            queryFn: (): Promise<{ count: number }> => authGET(`${BASE_URL}/users/count`),
        },
        {
            queryKey: 'visitationsForTheLastSixMonthsData',
            queryFn: (): Promise<ChartDataFormat> => authGET(`${BASE_URL}/analytics/visitations`),
        },
        {
            queryKey: 'visitationsForTodayData',
            queryFn: (): Promise<{ count: number }> => authGET(`${BASE_URL}/analytics/visitations/today`),
        },
        {
            queryKey: 'mostActiveUserData',
            queryFn: (): Promise<UserCardProps> => authGET(`${BASE_URL}/analytics/most-active-user`),
        },
    ]);

    const isFetching = recipesAreLoading || commentsAreLoading || usersAreLoading || visitationsAreLoading || mostActiveUserIsFetching || visitationsForTodayAreLoading;

    return {
        totalRecipesData,
        totalUsersData,
        totalCommentsData,
        visitationsForTheLastSixMonthsData,
        mostActiveUserData,
        visitationsForTodayData,
        recipesFetchError,
        usersFetchError,
        commentsFetchError,
        visitationsFetchError,
        mostActiveUserFetchError,
        visitationsForTodayFetchError,
        isFetching,
    }
}