import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';

export default Menu = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style= {{flex: 1, justifyContent:"center"}}>
      <Text style={{fontSize:42}}>Rubiks Helper</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'space-evenly'}}>
      <Button title='Solve Cube' onPress={() => navigation.navigate("RubikSolver")}/>
      <Button title='Timer'onPress={() => navigation.navigate("Timer")}/>
      <Button title='LeaderBoard'onPress={() => navigation.navigate("PastAttempts")}/>
      <Button title='User Stats'/>
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