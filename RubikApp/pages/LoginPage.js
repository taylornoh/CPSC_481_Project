import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Button,
  Modal,
  Alert,
} from 'react-native';
import LoginStyle from '../styles/LoginStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../AppContext';

export default Login = ({navigation}) => {
  const [loginUser, setLoginUser] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [createNewUserScreen, setCreateNewUserScreen] = React.useState(false);
  const [newUser, setNewUser] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  const context = React.useContext(AppContext);

  const saveNewUser = async () => {
    try {
      if (newPassword !== null && newUser !== null) {
        await AsyncStorage.setItem();
      }
    } catch (error) {}
  };
  const createAlertPopUp = (alertType) =>
    Alert.alert('User Create Error', alertType, [
      {
        text: 'OK',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);

  const createNewUser = () => {
    if (checkCreateUserPossible()) {
      context.setUsers([
        ...context.users,
        {user: newUser, password: newPassword},
      ]);
      setCreateNewUserScreen(false);
    }
    setNewPassword('');
    setNewUser('');
  };

  const checkCreateUserPossible = () => {
    //Check for previous User with same credential
    if(checkUserCredentials(newUser, newPassword)){
      createAlertPopUp('User Already Exists!')
      return false;
    }

    //Check that all data fields are filled
    if (newUser === '' || newPassword === '') {
      createAlertPopUp('Please Fill Out All Fields!');
      return false;
    }

    return true;
  };


  const login = () =>{
    if(checkUserCredentials(loginUser, loginPassword)){
      context.setCurUser(loginUser)
      return true
    }
    else{
      createAlertPopUp("Invalid Login Credentials")
      return false
    }
  }


  const checkUserCredentials = (userAttempt, passwordAttempt) =>{
    for (i = 0; i < context.users.length; i++) {
      if (
        context.users[i].user === userAttempt &&
        context.users[i].password === passwordAttempt
      ) {
        return true
      }
    }
    return false
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={LoginStyle.textInput}
        onChangeText={setLoginUser}
        value={loginUser}
        placeholder="Username"
      />
      <TextInput
        style={LoginStyle.textInput}
        onChangeText={setLoginPassword}
        value={loginPassword}
        placeholder="Password"
      />
      <StatusBar style="auto" />
      <View>
        <Button style={LoginStyle.button} title="Submit" onPress={() => {login() ?  navigation.navigate("Menu") : null}}/>
        <View style={LoginStyle.verticalSpace} />
        <Button
          style={LoginStyle.button}
          title="New User"
          onPress={() => setCreateNewUserScreen(true)}
        />
      </View>

      <Modal visible={createNewUserScreen} animationType="slide">
        <View style={styles.container}>
          <Text>New User</Text>
          <TextInput
            style={LoginStyle.textInput}
            onChangeText={setNewUser}
            value={newUser}
            placeholder="Username"
          />
          <TextInput
            style={LoginStyle.textInput}
            onChangeText={setNewPassword}
            value={newPassword}
            placeholder="Password"
          />

          <Button
            title="Confirm"
            onPress={() => {
              createNewUser();
            }}
          />
          <View style={LoginStyle.verticalSpace} />
          <Button
            title="Cancel"
            onPress={() => setCreateNewUserScreen(false)}
          />
        </View>
      </Modal>
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
