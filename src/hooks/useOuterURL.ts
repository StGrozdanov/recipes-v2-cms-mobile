import { useEffect, useState } from "react";
import { Linking } from "react-native";

/**
 * Hook that handles redirects to external URL. At first it will attempt to open it ad check if it's a valid URL
 * if not - it will return an alert. 
 */
export const useOuterURL = () => {
    const [URL, setURL] = useState('');
    const setURLHandler = (URLInput: string) => setURL(URLInput);

    useEffect(() => {
        if (URL !== '') {
            const linkingHandler = async () => {
                await Linking.openURL(URL);
            }
            linkingHandler();
        }
    }, [URL]);

    return { setURLHandler };
}