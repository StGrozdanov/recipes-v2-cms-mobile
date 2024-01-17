import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { statsCardStyles } from "./StatsCardStyleSheet";
import { useThemeContext } from "../../hooks/useThemeContext";
import { CARD_ICONS, cardIconsStyles } from "./constants";

type StatsCardProps = {
    text: string,
    value: string | number,
}

export default function StatsCard({ text, value }: StatsCardProps) {
    const iconKey = text.replace(' ', '')
    const { theme } = useThemeContext();

    return (
        <View style={statsCardStyles[theme + 'Card']}>
            <View style={[statsCardStyles.iconContainer, cardIconsStyles[iconKey]]}>
                <FontAwesomeIcon
                    style={[statsCardStyles.icons, cardIconsStyles[iconKey]]}
                    size={13}
                    icon={CARD_ICONS[iconKey]}
                />
            </View>
            <Text style={[statsCardStyles[theme + 'TextContent'], statsCardStyles.cardHeading]}>{text}</Text>
            <Text style={statsCardStyles[theme + 'TextContent']}>{value}</Text>
            <View style={statsCardStyles[theme + 'AfterElement']} />
        </View>
    );
}