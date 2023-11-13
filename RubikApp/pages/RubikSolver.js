import { StyleSheet, Text, View, StatusBar, Image, Button } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import * as React from 'react';
export default PastAttempt = () => {

  const [saveImage, setSaveImage] = React.useState('');

  const takeImage = () =>{
    ImageCropPicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image.path)
      setSaveImage(image.path)
    })
  }

  return (
    <View style={styles.container}>
      <Button title='Take Image' onPress={() => {takeImage()}}/>
      <Image source={{ uri: saveImage }} style={{ width: 300, height: 300 }} />
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