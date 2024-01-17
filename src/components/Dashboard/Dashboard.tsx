import { View, ScrollView } from "react-native";
import { dashboardStyles } from "./DashboardStyleSheet";
import StatsCard from "../StatsCard/StatsCard";
import Chart from "../StatisticChart/Chart";
import UserCard from "../UserCard/UserCard";
import { useDashboardData } from "../../services/dashboardService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Dashboard() {
    const {
        mostActiveUserData,
        totalCommentsData,
        totalRecipesData,
        visitationsForTheLastSixMonthsData,
        totalUsersData,
        visitationsForTodayData,
        isFetching
    } = useDashboardData();

    return (
        isFetching
            ? <LoadingSpinner />
            : <ScrollView style={{ flex: 1 }}>
                <View style={dashboardStyles.statsCardContainer}>
                    <StatsCard text="ПУБЛИКАЦИИ" value={totalRecipesData?.count || 0} />
                    <StatsCard text="ПОТРЕБИТЕЛИ" value={totalUsersData?.count || 0} />
                    <StatsCard text="КОМЕНТАРИ" value={totalCommentsData?.count || 0} />
                    <StatsCard text="ПОСЕЩЕНИЯТА ДНЕС" value={visitationsForTodayData?.count || 0} />
                </View>
                <Chart title="Посещения за последните 6 месеца" data={visitationsForTheLastSixMonthsData!} />
                <UserCard 
                    avatarURL={mostActiveUserData?.avatarURL}
                    username={mostActiveUserData?.username}
                    commentsCount={mostActiveUserData?.commentsCount}
                    recipesCount={mostActiveUserData?.recipesCount}
                    totalPublicationsCount={mostActiveUserData?.totalPublicationsCount}
                />
            </ScrollView>
    );
}