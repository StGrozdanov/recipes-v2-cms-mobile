import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";

/**
 * Hook that handles redirects to external URL. At first it will attempt to open it ad check if it's a valid URL
 * if not - it will return an alert. 
 */
export const useOuterURL = () => {
    const [URL, setURL] = useState('');
    const setURLHandler = (URLInput: string) => setURL(URLInput);

    useEffect(() => {
        if (URL !== '') {
            let supported;

            const linkingCanOpenHandler = async () => {
                supported = await Linking.canOpenURL(URL);
            }

            linkingCanOpenHandler();

            if (supported) {
                const linkingHandler = async () => {
                    await Linking.openURL(URL);
                }
                linkingHandler();
            } else {
                Alert.alert(`Don't know how to open this URL: ${URL}`);
            }
        }
    }, [URL]);

    return { setURLHandler };
}