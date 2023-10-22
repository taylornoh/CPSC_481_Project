import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RubikSolver from './pages/RubikSolver';
import Menu from './pages/Menu';
import PastAttempts from './pages/PastAttempts';
import Timer from './pages/Timer';

export default App = () => {
 const Stack = createNativeStackNavigator();


 return (
   <NavigationContainer>
     <Stack.Navigator>
     <Stack.Screen 
         name='Menu'
         component={Menu}
       />

       <Stack.Screen 
         name='RubikSolver'
         component={RubikSolver}
       />

        <Stack.Screen 
         name='Timer'
         component={Timer}
       />
      
      <Stack.Screen 
         name='PastAttempts'
         component={PastAttempts}
       />      
     </Stack.Navigator>
 </NavigationContainer>
 );
}
