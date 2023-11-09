import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';
import * as React from 'react';
import AppContext from '../AppContext';

export default Timer = () => {
  const [counter, setCounter] = React.useState(0);
  const [second, setSecond] = React.useState(0);
  const [minute, setMinute] = React.useState(0);
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    if (start) {
      //Issue: Timer is slow due to SetTimeout has a min delay of 4 milliseconds
      //Band-aid solution : set counter value to increased number

      if (counter < 99) {
        setTimeout(() => setCounter(counter + 1.66666666666), 1);
      } else if (second < 59) {
        setCounter(0);
        setSecond(second + 1);
      } else {
        setCounter(0);
        setSecond(0);
        setMinute(minute + 1);
      }
    }
  }, [counter, start]);

  const context = React.useContext(AppContext);

  /*
  const saveTime = () =>{

    let tempboard = [...context.leaderBoard]
    let time = minute + "." + second + "." + Math.round(counter);

    for(times = 0; times < tempboard.length; times++){
      let splitValues = tempboard[times].split(".");
      if()
    }

    context.setLeaderboard([...context.leaderBoard])
  }
*/
  return (
    <View style={styles.container}>
      <View>
        <Text>
          {' '}
          {minute < 10 ? '0' : null}
          {minute} : {second < 10 ? '0' : null}
          {second} : {Math.round(counter) < 10 ? '0' : null}
          {Math.round(counter)}
        </Text>
      </View>
      <View>
        <Button
          title={!start ? 'Start' : 'Stop'}
          onPress={() => setStart(!start)}
        />

        <Button
          title="Save"
          disabled={(minute === 0 && counter === 0 && second === 0) ? true : false}
        />
        <Button
          title="Reset"
          disabled={(minute === 0 && counter === 0 && second === 0) ? true : false}
          onPress={() => {
            setCounter(0);
            setSecond(0);
          }}
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
