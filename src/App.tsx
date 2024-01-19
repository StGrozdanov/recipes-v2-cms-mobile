import { NOTIFY_APP_ID, NOTIFY_APP_TOKEN } from "@env";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider, dehydrate, hydrate } from 'react-query';
import { queryConfig } from './configs/reactQueryConfig';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import registerNNPushToken from 'native-notify';
import { ThemeProvider } from "./contexts/ThemeContext";
import Panel from "./components/Panel/Panel";
import Users from "./components/Users/Users";
import { SearchProvider } from "./contexts/SearchContext";
import Recipes from "./components/Recipes/Recipes";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient(queryConfig);
// If the mutation has been paused because the device is for example offline,
// Then the paused mutation can be dehydrated when the application quits:
const state = dehydrate(queryClient);
// The mutation can then be hydrated again when the application is started:
hydrate(queryClient, state);
// Resume the paused mutations:
queryClient.resumePausedMutations();

export default function App() {
  registerNNPushToken(NOTIFY_APP_ID, NOTIFY_APP_TOKEN);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SearchProvider>
          <AuthProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>

                <Stack.Screen name='Home' component={LoadingScreen} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Dashboard'>
                  {() => <Panel><Dashboard /></Panel>}
                </Stack.Screen>
                <Stack.Screen name="Users" initialParams={{ itemId: '' }}>
                  {() => <Panel><Users /></Panel>}
                </Stack.Screen>
                <Stack.Screen name="Recipes" initialParams={{ itemId: '' }}>
                  {() => <Panel><Recipes /></Panel>}
                </Stack.Screen>

              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </SearchProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

registerRootComponent(App);