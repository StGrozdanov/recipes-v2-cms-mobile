import { Text, View, Dimensions } from "react-native";
import { chartStyles } from "./ChartStyleSheet";
import { LineChart } from "react-native-chart-kit";
import { CHART_CONFIGURATION } from "../../configs/chartConfig";
import { useThemeContext } from "../../hooks/useThemeContext";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";

type ChartProps = {
    title: string,
    data: ChartData
}

export default function Chart({ title, data }: ChartProps) {
    const { theme } = useThemeContext();

    return (
        <View style={chartStyles.container}>
            <Text style={theme === 'light' ? chartStyles.lightTitle : chartStyles.darkTitle}>{title}</Text>
            <LineChart
                data={data}
                width={Dimensions.get("window").width * 1.1}
                height={Dimensions.get("window").height * 0.3}
                chartConfig={CHART_CONFIGURATION}
                bezier
                style={{ borderRadius: 20 }}
                withOuterLines={false}
                withVerticalLines={false}
                fromZero
                transparent
                segments={3}
            />
        </View>
    );
}