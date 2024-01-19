import { View, Text } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { useThemeContext } from "../../../../hooks/useThemeContext";

type StatusProps = {
    status: 'APPROVED' | 'PENDING' | 'online' | 'offline',
}

export default function Status({ status }: StatusProps) {
    const { theme } = useThemeContext();
    return (
        <View>
            <Text style={[tableBodyStyles[theme + 'AdditionalDataHeading']]}>Status</Text>
            <Text
                style={[
                    tableBodyStyles[theme + 'AdditionalDataContent'], 
                    tableBodyStyles.status,
                    tableBodyStyles[status]
                ]}
            >
                {status}
            </Text>
        </View>
    );
}