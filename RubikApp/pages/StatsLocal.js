import { StyleSheet, Text, View, StatusBar, FlatList   } from 'react-native';
import AppContext from '../AppContext';
import * as React from 'react';

export default StatsLocal = () => {
  const context = React.useContext(AppContext);


  return (
    <View style={styles.container}>
      <View style= {styles.list}>
        <FlatList
          data={context.leaderBoard}
          renderItem={({item}) => {
            if(item.user === context.curUser){
              return(
                <View style={styles.listItem}>
                <Text>{item.user}</Text>
                <Text>{item.finalTime}</Text>
              </View>
              )

            }
          }}
          keyExtractor={item => item.id}
        />

      </View>

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
  listItem:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10
  },
  list:{
    width: "80%"
  }
});