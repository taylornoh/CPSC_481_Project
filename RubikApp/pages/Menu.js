import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';

export default Menu = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button title='Solve Cube' onPress={() => navigation.navigate("RubikSolver")}/>
      <Button title='Timer'onPress={() => navigation.navigate("Timer")}/>
      <Button title='LeaderBoard'onPress={() => navigation.navigate("PastAttempts")}/>
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