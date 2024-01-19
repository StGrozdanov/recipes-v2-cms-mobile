import { TouchableOpacity, View, Image, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons/faEllipsis';
import { tableHeadStyles } from "./TableHeadStyleSheet";
import { useThemeContext } from "../../../hooks/useThemeContext";

type TableHeadProps = {
    isEven: boolean,
    contentName: string,
    pictureSource: string,
    pictureType: string,
    toggleHandler: () => void,
    optionsHandler: () => void,
    isToggled: boolean
}

export default function TableHead({
    isEven,
    contentName,
    pictureSource,
    pictureType,
    toggleHandler,
    optionsHandler,
    isToggled
}: TableHeadProps) {
    const { theme } = useThemeContext();

    return (
        <TouchableOpacity onPress={toggleHandler}>
            <View
                style={[
                    tableHeadStyles[theme + 'Section'],
                    isEven && tableHeadStyles[theme + 'EvenItem'],
                ]}
            >
                <FontAwesomeIcon
                    icon={isToggled ? faAngleDown : faAngleRight}
                    style={[tableHeadStyles.icon, isEven ? tableHeadStyles[theme + 'WhiteText'] : tableHeadStyles.iconText]}
                    size={17.5}
                />
                <View style={tableHeadStyles.leftUserSectionContent}>
                    {
                        pictureSource && pictureSource !== '/avatar.png'
                            ? <Image
                                source={{ uri: pictureSource }}
                                style={tableHeadStyles[theme + 'Avatar']}
                            />
                            : <Image
                                style={tableHeadStyles[theme + 'Avatar']}
                                source={
                                    pictureType === 'avatar'
                                        ? require('../../../../assets/avatar.png')
                                        : require('../../../../assets/food.jpg')
                                }
                            />
                    }
                    <Text style={[isEven && tableHeadStyles[theme + 'WhiteText'], tableHeadStyles.text]}>{contentName}</Text>
                </View>
                <TouchableOpacity style={[tableHeadStyles.rightUserSectionContent]} onPress={optionsHandler}>
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        style={[isEven ? tableHeadStyles[theme + 'WhiteText'] : tableHeadStyles.iconText]}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}