import { View, Image, TouchableOpacity } from 'react-native';
import { adminPanelNav } from './NavigationStyleSheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { faUserLarge } from '@fortawesome/free-solid-svg-icons/faUserLarge';
import { faBowlRice } from '@fortawesome/free-solid-svg-icons/faBowlRice';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons/faCommentDots';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useThemeContext } from "../../hooks/useThemeContext";
import { useOuterURL } from '../../hooks/useOuterURL';

export default function Navigation() {
    const navigationRoute = useRoute();
    const navigator = useNavigation();
    const { theme } = useThemeContext();
    const { setURLHandler } = useOuterURL();

    const currentPageName = navigationRoute.name;

    return (
        <View style={adminPanelNav[theme + 'Navigation']}>
            <TouchableOpacity onPress={() => setURLHandler('https://all-the-best-recipes.vercel.app')}>
                <Image style={adminPanelNav[theme + 'WebsiteLogo']} source={require('../../../assets/cooking.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate('Dashboard' as never)}>
                <FontAwesomeIcon style={adminPanelNav[theme + 'NavItem']} size={26} icon={faChartSimple} />
                <View style={currentPageName === 'Dashboard' && adminPanelNav.selected} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate('Users' as never)}>
                <FontAwesomeIcon style={adminPanelNav[theme + 'NavItem']} size={26} icon={faUserLarge} />
                <View style={currentPageName === 'Users' && adminPanelNav.selected} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate('Recipes' as never)}>
                <FontAwesomeIcon style={adminPanelNav[theme + 'NavItem']} size={26} icon={faBowlRice} />
                <View style={currentPageName === 'Recipes' && adminPanelNav.selected} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate('Comments' as never)}>
                <FontAwesomeIcon style={adminPanelNav[theme + 'NavItem']} size={26} icon={faCommentDots} />
                <View style={currentPageName === 'Comments' && adminPanelNav.selected} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate('Settings' as never)}>
                <FontAwesomeIcon style={adminPanelNav[theme + 'NavItem']} size={26} icon={faGear} />
                <View style={currentPageName === 'Settings' && adminPanelNav.selected} />
            </TouchableOpacity>
        </View>
    );
}