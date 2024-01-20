import { NOTIFY_APP_ID, NOTIFY_APP_TOKEN, SOCKET_URL } from "@env";
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
import Comments from "./components/Comments/Comments";
import Settings from "./components/Settings/Settings";
import UserProfile from "./components/UserProfile/UserProfile";
import useWebSocket from "react-use-websocket";
import Notifications from "./components/Notifications/Notifications";

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

  useWebSocket(SOCKET_URL, {
    shouldReconnect: (_closeEvent) => true,
    onMessage: (event: WebSocketEventMap['message']) => {
      let usernames: string[] = [];
      try {
        usernames = JSON.parse(event.data);
      } catch (err) {
        console.info(event.data)
      }
      usernames.forEach(username => queryClient.invalidateQueries(['userNotifications', username]));
    },
    reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 2000, 10000),
    reconnectAttempts: 10,
    share: true,
  });

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
                <Stack.Screen name="Comments" initialParams={{ itemId: '' }}>
                  {() => <Panel><Comments /></Panel>}
                </Stack.Screen>
                <Stack.Screen name="Settings">
                  {() => <Panel><Settings /></Panel>}
                </Stack.Screen>
                <Stack.Screen name="Profile" initialParams={{ itemId: 0 }}>
                  {() => <Panel><UserProfile /></Panel>}
                </Stack.Screen>
                <Stack.Screen name="Notifications">
                  {() => <Panel><Notifications /></Panel>}
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