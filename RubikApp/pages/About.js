import {StyleSheet, Text, View, StatusBar, Linking} from 'react-native';

export default About = () => {
  return (
    <View style={styles.container}>
      <Text>Hi my name is Kevin Delgado and this is my app</Text>
      <Text>Elevator Pitch:</Text>
      <Text>Hi! Kevin Mays here with the all new Rubik's Helper. This handy little tool will make solving a rubik's cube a breeze. All you have to do is feed the app with data from your cube and it does the work for you. How amazing! Not only this but this app helps you time and  track your stats on your solving speed to make sure you can be the best rubik's solver that you can be!</Text>
      <Text>Features:</Text>
      <Text>Ai solving of Rubik's Cube | Timer for solving - Stat Tracking | Stats with solves ranked by speed for individual users - Stat Display (Local) |
      Ability to Create Users to track stats - Account Creation | General Leaderboard with all Player stats - Stat Display (Global)
      </Text>

      <Text style={{color: 'blue'}}
            onPress= {() => Linking.openURL('https://github.com/KevinDelgad/CPSC_481_Project')}>
        Github</Text>

        <Text>User Profles:</Text>
        <Text>The Novice: Somebody who has never done a rubik's cube or has very little experience and could use the AI to help in solving the cube. It would be a very good learning experience when they get stuck or just need to see how a cube would be solved. It would also help them to track their progress and how much they improve</Text>
        <Text>The Moderate/Pro: This user is somebody who knows how to solve a cube and may not have as much need for the AI, but would find more use for stat tracking as they can try to beat their previous records and compare it to the records of other to try and beat their scores.</Text>
      <StatusBar style="auto" />
    </View>
  );
};

/*
      <Text style={{color: 'blue'}}
            onPress= {() => Linking.openURL('https://docs.google.com/spreadsheets/d/13wyC2kJ0fgr2tO6t6JBT6HKLcDnZURTzfRbtUg-fZ3I/edit?usp=sharing')}>
        Here is my Proposal Doc</Text>
      <StatusBar style="auto" />
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
