import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppContext from './AppContext';

import RubikSolver from './pages/RubikSolver';
import Menu from './pages/Menu';
import PastAttempts from './pages/StatsLocal';
import Timer from './pages/Timer';
import LoginPage from './pages/LoginPage';

export default App = () => {
  const Stack = createNativeStackNavigator();

  const [users, setUsers] = React.useState([]);
  const [curUser, setCurUser] = React.useState();
  const [leaderBoard, setLeaderboard] = React.useState([]);
  const [firstLoad, setFirstLoad] = React.useState(true);

  const userStorageKey = '@Users';

  const loadUsers = async () => {
    try {
      const value = await AsyncStorage.getItem(userStorageKey);

      if (value !== null) {
        const parseValue = JSON.parse(value);
        setUsers(parseValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveUsers = async () => {
    try {
      if (users !== null) {
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(users));  
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    users,
    setUsers,
    curUser,
    setCurUser,
    leaderBoard,
    setLeaderboard,
  };

  React.useEffect(() => {
    if (!firstLoad) {
      saveUsers();
    } else {
      setFirstLoad(false);
    }
  }, [users]);


  React.useEffect(() => {
    loadUsers()
  }, [])

  return (
    <AppContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} />

          <Stack.Screen name="Menu" component={Menu} />

          <Stack.Screen name="RubikSolver" component={RubikSolver} />

          <Stack.Screen name="Timer" component={Timer} />

          <Stack.Screen name="PastAttempts" component={PastAttempts} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};
