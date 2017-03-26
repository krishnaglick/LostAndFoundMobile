
import ImagePicker from 'react-native-image-picker';

const imagePickerOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

exports.show = async function() {
  return new Promise((res, rej) => {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        res('cancelled');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        rej(response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        //Not using this atm;
      }
      else {
        res(response);
      }
    });
  });
};
