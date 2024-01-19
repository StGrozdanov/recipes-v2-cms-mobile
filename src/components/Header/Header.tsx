import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { faMoon } from '@fortawesome/free-regular-svg-icons/faMoon';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';
import { faUserLarge } from "@fortawesome/free-solid-svg-icons/faUserLarge";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons/faCommentDots";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons/faBowlRice";
import { headerStyle } from "./HeaderStyleSheet";
import { greetingGenerator } from "../../utils/headerGreetingGenerator";
import { useEffect, useState } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSearchContext } from "../../hooks/useSearchContext";
import { userAvatarIsPresent } from "../../utils/avatarIsPresent";
import { actionsDropdownStyles } from "../ActionsDropdown/ActionsDropdownStyleSheet";
import { actionStyles } from "../Actions/ActionsStyleSheet";
import { Theme } from "../../contexts/ThemeContext";
import { useSearchLocations } from "./hooks/useSearchLocations";
import { useSearchService } from "../../services/searchService";
import { GlobalSearchData } from "@/services/types";

const iconTypes = (theme: Theme, resultType: 'users' | 'comments' | 'recipes') => {
    const types = {
        users: <FontAwesomeIcon style={actionStyles[theme + 'SearchIcons']} color='floralwhite' size={16} icon={faUserLarge} />,
        comments: <FontAwesomeIcon style={actionStyles[theme + 'SearchIcons']} color='floralwhite' size={16} icon={faCommentDots} />,
        recipes: <FontAwesomeIcon style={actionStyles[theme + 'SearchIcons']} color='floralwhite' size={16} icon={faBowlRice} />,
    }
    return types[resultType];
}

const currentHour = new Date(Date.now()).getHours();

type HeaderProps = {
    notificationsCount: number,
}

export default function Header({ notificationsCount }: HeaderProps) {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isGlobalSearch, setIsGlobalSearch] = useState(false);
    const [globalSearchResults, setGlobalSearchResults] = useState<GlobalSearchData[]>();
    const { theme, changeTheme } = useThemeContext();
    const { username, avatar } = useAuthContext();
    const { setSearch } = useSearchContext();
    const navigationRoute = useRoute();
    const navigator = useNavigation();
    const currentPageName = navigationRoute.name;
    const { searchHandler } = useSearchLocations();
    const { globalSearch } = useSearchService();

    useEffect(() => {
        if (searchValue.trim() !== '') {
            searchHandler(currentPageName, searchValue)
                .then(res => {
                    if (res !== 'global') {
                        setSearch({ results: res!.content, collection: currentPageName });
                    } else {
                        setIsGlobalSearch(true);
                        globalSearch(searchValue)
                            .then(resp => setGlobalSearchResults(resp! as GlobalSearchData[]));
                    }
                })
        }
    }, [searchValue])

    const headerMessageGenerator = greetingGenerator(currentPageName, currentHour);

    const changeThemeHandler = async () => theme === 'light' ? await changeTheme('dark') : await changeTheme('light');

    const searchBarHandler = () => {
        if (showSearchBar) {
            setShowSearchBar(false);
            setIsGlobalSearch(false);
        } else {
            setShowSearchBar(true);
        }
    }

    const showNotificationsHandler = () => navigator.navigate('Notifications' as never);

    const searchRedirectHandler = (query: string, location: string) => {
        location = location.charAt(0).toUpperCase() + location.substring(1);
        searchHandler(location, query)
            .then(res => {
                if (res !== 'global') {
                    setSearch({ results: res!.content, collection: location })
                    navigator.navigate(location as never);
                }
            });
    }

    return (
        <View style={headerStyle[theme + 'Container']}>
            <View style={headerStyle.leftSection}>
                <Text
                    style={headerStyle[theme + 'GreetingText']}
                >
                    {headerMessageGenerator.greeting}, {username}
                </Text>
                <Text style={headerStyle[theme + 'CurrentPage']}>{headerMessageGenerator.message}</Text>
            </View>
            <View style={headerStyle.rightSection}>
                <TextInput
                    style={showSearchBar ? headerStyle[theme + 'SearchBar'] : { display: 'none' }}
                    placeholder='type to search...'
                    selectionColor='#55595c'
                    onChangeText={(text) => {
                        setSearchValue(text);
                        if (text === '') {
                            setSearch({ collection: '', results: [] })
                        }
                    }}
                />
                {
                    isGlobalSearch &&
                    <ScrollView
                        style={actionsDropdownStyles[theme + 'SearchContainer']}
                        nestedScrollEnabled
                    >
                        {
                            globalSearchResults?.map(result => {
                                const results = result.content;

                                return results.map(searchResponse => {
                                    return (
                                        <TouchableOpacity
                                            style={actionStyles.searchAction}
                                            onPress={() => searchRedirectHandler(searchResponse, result.resultType)}
                                            key={searchResponse + result.resultType}
                                        >
                                            {iconTypes(theme, result.resultType)}
                                            <Text style={actionStyles.text}>{searchResponse}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            })
                        }
                    </ScrollView>
                }
                <TouchableOpacity style={headerStyle[theme + 'IconContainer']} onPress={searchBarHandler}>
                    <FontAwesomeIcon
                        style={headerStyle[theme + 'Icons']}
                        size={theme === 'light' ? 18 : 21.5}
                        icon={faMagnifyingGlass}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={headerStyle[theme + 'IconContainer']} onPress={showNotificationsHandler}>
                    {notificationsCount > 0 &&
                        <Text style={headerStyle[theme + 'NotificationCounter']}>{notificationsCount}</Text>
                    }
                    <FontAwesomeIcon
                        style={headerStyle[theme + 'Icons']}
                        size={theme === 'light' ? 20 : 24}
                        icon={faBell}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={changeThemeHandler} >
                    <FontAwesomeIcon
                        style={headerStyle[theme + 'Icons']}
                        size={theme === 'light' ? 20 : 24}
                        icon={theme === 'light' ? faMoon : faLightbulb}
                    />
                </TouchableOpacity>
                {
                    userAvatarIsPresent(avatar)
                        ? <Image
                            source={{ uri: avatar }}
                            style={headerStyle[theme + 'Avatar']}
                        />
                        : <Image
                            style={headerStyle[theme + 'Avatar']}
                            source={require('../../../assets/avatar.png')}
                        />
                }
            </View>
        </View>
    );
}