
import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';

class ImagePreviewer extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      imageWidth: 50,
      imageHeight: 50
    };

    this.toggleImageSize = this.toggleImageSize.bind(this);
  }

  toggleImageSize() {
    if(this.state.imageWidth === 50)
      this.setState({
        imageWidth: '100%',
        imageHeight: '100%'
      });
    else
      this.setState({
        imageWidth: 50,
        imageHeight: 50
      });
  }

  render() {
    return (
      <TouchableHighlight onPress={this.toggleImageSize}>
        <Image
          style={{width: this.state.imageWidth, height: this.state.imageHeight}}
          source={{uri: this.props.uri}}
        />
      </TouchableHighlight>
    );
  }
}

export default ImagePreviewer;
