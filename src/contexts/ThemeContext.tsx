import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ContainerProps } from './types';

export type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme,
    changeTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    changeTheme: () => console.warn('not initialised yet'),
});

export const ThemeProvider = ({ children }: ContainerProps) => {
    const [theme, setTheme] = useState<Theme>('light');

    AsyncStorage.getItem('theme')
        .then(theme => {
            if (theme == null) {
                changeTheme('light').then(_res => console.info('user theme has fallen back to default value'));
            } else {
                setTheme(JSON.parse(theme));
            }
        })
        .catch((e) => {
            console.warn(`the user does not have a saved theme - ${e}`);
            setTheme('light');
        });

    const changeTheme = async (theme: Theme) => {
        try {
            const jsonValue = JSON.stringify(theme)
            await AsyncStorage.setItem('theme', jsonValue)
            setTheme(theme);
        } catch (e) {
            console.error(`Saving theme got wrong .. ${e}`);
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};