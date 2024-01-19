/* eslint no-prototype-builtins: 0 */
import { View } from "react-native";
import { tableBodyStyles } from "./TableBodyStyleSheet";
import Cell from './TableBodyTypes/TableBodyCell';
import Status from './TableBodyTypes/TableBodyStatus';
import Owner from "./TableBodyTypes/TableBodyOwner";
import Location from "./TableBodyTypes/TableBodyLocation";
import Profile from "./TableBodyTypes/TableBodyProfile";
import { useThemeContext } from "../../../hooks/useThemeContext";

const CELL_TYPES: Record<string, any> = {
    Status: (cellData: 'APPROVED' | 'PENDING', cellKey: number) => <Status status={cellData} key={cellKey} />,
    Owner: (location: string, cellKey: number) => <Owner pointer={location} key={cellKey} />,
    Profile: (location: string, cellKey: number) => <Profile pointer={location} key={cellKey} />,
    Location: (location: string, cellKey: number) => <Location pointer={location} key={cellKey} />,
}

type TableBodyProps = {
    isToggled: boolean,
    data: any,
}

export default function TableBody({ isToggled, data }: TableBodyProps) {
    const { theme } = useThemeContext();
    data = Object.entries(data);

    return (
        <View style={[tableBodyStyles[theme + 'AdditionalData'], !isToggled && tableBodyStyles.toggledData]}>
            {
                data.map((content: string, id: number) => {
                    const cellHeading = content[0];
                    const cellData = content[1];

                    return CELL_TYPES.hasOwnProperty(cellHeading)
                        ? CELL_TYPES[cellHeading](cellData, id)
                        : <Cell heading={cellHeading} data={cellData} key={id} />
                })
            }
        </View>
    );
}