import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import * as React from 'react';
import * as FS from "expo-file-system";
export default PastAttempt = () => {
  const [saveImageFront, setSaveImageFront] = React.useState('Front');
  const [saveImageTop, setSaveImageTop] = React.useState('Top');
  const [saveImageBack, setSaveImageBack] = React.useState('Back');
  const [saveImageLeft, setSaveImageLeft] = React.useState('Left');
  const [saveImageRight, setSaveImageRight] = React.useState('Right');
  const [saveImageBottom, setSaveImageBottom] = React.useState('Bottom');

  const [uploadPossible, setUploadPossible] = React.useState(true);


  const takeImage = async setRubikSide => {
    const image = await ImageCropPicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    });
    setRubikSide(image.path);
  };

  const uploadImages = async () => {
    await this.toServer({
      base64: true,
      uri: saveImageFront,
    });

    await this.toServer({
      base64: true,
      uri: saveImageTop,
    });

    await this.toServer({
      base64: true,
      uri: saveImageBack,
    });

    await this.toServer({
      base64: true,
      uri: saveImageBottom,
    });

    await this.toServer({
      base64: true,
      uri: saveImageLeft,
    });

    await this.toServer({
      base64: true,
      uri: saveImageRight,
    });
  };


  React.useEffect(() => {
    // Check if all state variables have changed
    const allChanged = (
      saveImageFront !== 'Front' &&
      saveImageBack !== 'Back' &&
      saveImageBottom !== 'Bottom' &&
      saveImageLeft !== 'Left' &&
      saveImageRight !== 'Right' &&
      saveImageTop !== 'Top'

    )

    if (allChanged) {
      // Do something when all state variables have changed
      setUploadPossible(!uploadPossible)
    }
  }, [saveImageFront, saveImageTop, saveImageBack, saveImageLeft, saveImageRight, saveImageBottom]);


  toServer = async mediaFile => {
    (route = '/image'), (content_type = 'image/jpeg');
    url = 'http://192.168.1.234:5000/image';
    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        'content-type': content_type,
      },
      httpMethod: 'POST',
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });

    console.log('Ping!');
    console.log(response.headers);
    console.log(response.body);
  };

  const checkImageIsValid = (val) => {
    return val.length > 10;
  };


  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={[
          [saveImageFront, setSaveImageFront],
          [saveImageBack, setSaveImageBack],
          [saveImageTop, setSaveImageTop],
          [saveImageLeft, setSaveImageLeft],
          [saveImageRight, setSaveImageRight],
          [saveImageBottom, setSaveImageBottom],
        ]}
        horizontal
        renderItem={({item}) => (
          <TouchableWithoutFeedback onPress={() => takeImage(item[1])}>
            {checkImageIsValid(item[0]) ? (
              <Image source={{uri: item[0]}} style={styles.image} />
            ) : (
              <Text style={styles.image}>{item[0]}</Text>
            )}
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <Button
        title="Upload Images"
        disabled = {uploadPossible}
        onPress={() => {
          uploadImages();
        }}
        style={styles.button}
      />

      <Button title="Switch Mode" style={styles.button} />

      <StatusBar style="auto" />
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
  list: {
    flexGrow: 0,
    height: '30%',
    marginVertical: 0, // Adjust the vertical margin as needed
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 10, // Adjust the horizontal margin between items
  },
  button: {
    marginTop: 20, // Adjust the margin from the list
  },
});
