
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
      chosenImage: null,
      title: 'Submit'
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
    this.setState({title: 'Submitting...'});

    const { description } = this.state;

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
    this.setState({
      description: '',
      uri: 'https://facebook.github.io/react/img/logo_og.png',
      chosenImage: null,
      title: 'Submit'
    });
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.changeImage}>
          <Image
            style={{width: '100%', height: 200}}
            source={{uri: this.state.uri}}
          />
        </TouchableHighlight>
        <TextInput
          onChangeText={(description) => this.setState({description})}
          placeholder='Description of, or info about, item.'
          value={this.state.description}
        />
        <Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={styles.buttonStyle}
          title={this.state.title}
          disabled={this.state.title !== 'Submit'}
          onPress={this.submit}/>
      </View>
    );
  }
}

export default Report;