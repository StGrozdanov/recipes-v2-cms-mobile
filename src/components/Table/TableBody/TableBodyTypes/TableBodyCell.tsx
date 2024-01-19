import { View, Text } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { useThemeContext } from "../../../../hooks/useThemeContext";

const VALID_CELLS = [
    'Status',
    'role',
]

type CellProps = {
    heading: string,
    data: string,
}

export default function Cell({ heading, data }: CellProps) {
    const { theme } = useThemeContext();

    if (VALID_CELLS.includes(heading) === false) {
        return null;
    }

    if (heading === 'role') {
        heading = 'Role';
    }

    return (
        <>
            <View>
                <Text style={tableBodyStyles[theme + 'AdditionalDataHeading']}>{heading}</Text>
                <Text style={tableBodyStyles[theme + 'AdditionalDataContent']}>{data}</Text>
            </View>
        </>
    );
}