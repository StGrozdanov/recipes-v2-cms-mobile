import { loadingScreenStyles } from "../LoadingScreen/LoadingScreenStyleSheet"
import { Image } from "react-native"

export default function LoadingSpinner() {
    return (
        <Image
            source={require('../../../assets/admin-panel-loading.gif')}
            style={loadingScreenStyles.loadingSpinner}
        />
    )
}