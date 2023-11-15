import React, { Component } from "react";
import { Button, SafeAreaView, StyleSheet, Alert, Text } from "react-native";

//Importing the installed libraries
import * as FS from "expo-file-system";
import ImageCropPicker from 'react-native-image-crop-picker';

export default function RubikSolver() {

  const [saveImage, setSaveImage] = React.useState('');

  const takeImage = async () =>{
    const image = await ImageCropPicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })    
    
    setSaveImage(image.path);

     await this.toServer({
      base64: true,
      uri: saveImage,
    });
  }


  toServer = async (mediaFile) => {
    ((route = "/image"), (content_type = "image/jpeg"))
    url = 'http://192.168.1.234:5000/image';
    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
    
    console.log("Ping!")
    console.log(response.headers);
    console.log(response.body);
  };

    return (
      <SafeAreaView style={styles.container}>
          <Button
            title="Pick From Gallery"
            onPress={async () => {
              takeImage();
            }}
          />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});