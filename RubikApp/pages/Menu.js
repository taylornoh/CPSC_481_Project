import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import AppContext from '../AppContext';
import * as React from "react"
export default Menu = ({navigation}) => {

  const context = React.useContext(AppContext);
  return (
    <View style={styles.container}>
      <View style= {{flex: 1, justifyContent:"center"}}>
      <Text style={{fontSize:42}}>Rubiks Helper</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'space-evenly'}}>
      <Button title='Solve Cube' onPress={() => navigation.navigate("RubikSolver")}/>
      <Button title='Timer'onPress={() => navigation.navigate("Timer")}/>
      <Button title='LeaderBoard'onPress={() => navigation.navigate("StatsGlobal")}/>
      <Button title='User Stats' onPress={ () => navigation.navigate("StatsLocal")}/>
      <Button title='About' onPress={() => navigation.navigate("AboutPage")}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});