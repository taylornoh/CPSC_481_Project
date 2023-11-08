import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import * as React from 'react';


export default Timer = () => {

  const [counter, setCounter] = React.useState(0);
  const [second, setSecond] = React.useState(0);
  const [start, setStart] = React.useState(false);



  React.useEffect(() => {
    if(start){
  
      //Issue, Timer is slow due to SetTimeout has a min delay of 4 milliseconds 
      //Band-aid solution, set counter value to increased number
      
      if(counter < 99){
        setTimeout(() => setCounter(counter + 1.666666), 1);

      }else{
        setCounter(0);
        setSecond(second + 1);
      }
    }
  }, [counter, start]);

  return (
    <View style={styles.container}>
      <Text> {second} : {Math.round(counter)}</Text>
      <Button title='Start' onPress={() => setStart(!start)}/>
      <StatusBar style="auto" />
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