
import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import { show } from '../helpers/imagePicker';

import { submitLocation, getLocation } from '../helpers/location';
import { uploadImage } from '../helpers/images';

import styles from '../styles/report';

class Report extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      description: '',
      uri: 'https://facebook.github.io/react/img/logo_og.png',
      chosenImage: null
    };

    this.submit = this.submit.bind(this);

    this.submitting = false;
    this.changingImage = false;
    this.changeImage = async () => {
      if(this.changingImage) return;
      this.changingImage = true;
      const imageSelection = await show();
      if(imageSelection.uri)
        this.setState({
          chosenImage: imageSelection,
          uri: imageSelection.uri
        });
      this.changingImage = false;
    };
  }

  async submit() {
    if(this.submitting) return;
    this.submitting = true;

    const { description } = this.state;
    //if(!description) return; //TODO: Alert to let them know they needa fill something in

    try {
      const { headers: { Location: uri } } = await uploadImage(this.state.chosenImage);
      const { coords: { longitude, latitude } } = await getLocation();
      await submitLocation({
        description,
        uri,
        longitude,
        latitude
      });
    }
    catch(x) {
      console.error(x);
    }
    this.submitting = false;
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.changeImage}>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: this.state.uri}}
          />
        </TouchableHighlight>
        <TextInput
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
        />
        <Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={styles.buttonStyle}
          title='Submit'
          onPress={this.submit}/>
      </View>
    );
  }
}

export default Report;