import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';
import * as React from 'react';

export default Timer = () => {
  const [counter, setCounter] = React.useState(0);
  const [second, setSecond] = React.useState(0);
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    if (start) {
      //Issue: Timer is slow due to SetTimeout has a min delay of 4 milliseconds
      //Band-aid solution : set counter value to increased number

      if (counter < 99) {
        setTimeout(() => setCounter(counter + 1.66666666666), 1);
      } else {
        setCounter(0);
        setSecond(second + 1);
      }
    }
  }, [counter, start]);

  return (
    <View style={styles.container}>
      <View>
        <Text>
          {' '}
          {second < 10 ? '0' : null}
          {second} : {Math.round(counter) < 10 ? '0' : null}
          {Math.round(counter)}
        </Text>
      </View>
      <View>
        <Button
          title={!start ? 'Start' : 'Stop'}
          onPress={() => setStart(!start)}
        />
        //Issue: Save and Reset buttons disabled until 1 second has passed
        <Button
          title="Save"
          disabled={counter < 0 ? true : second === 0 ? true : false}
        />
        <Button
          title="Reset"
          disabled={counter < 0 ? true : second === 0 ? true : false}
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
