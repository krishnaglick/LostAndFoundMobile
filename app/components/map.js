
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';

import ImagePreviewer from './image-previewer';
import { getLocation, getLocations } from '../helpers/location';

import styles from '../styles/map';

let updateLocations = async function() {
  this.setState({
    locations: await getLocations()
  });
};

class Map extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      locations: this.props.locations || [],
      selectedLocation: {},
      imageWidth: 50,
      imageHeight: 50
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.center = this.center.bind(this);

    updateLocations = updateLocations.bind(this);
  }

  componentDidMount() {
    this.center();
    updateLocations();
  }

  onRegionChange(region) {
    this.setState({region});
  }

  async center() {
    const { coords: { longitude, latitude } } = await getLocation();
    this.setState({
      region: {
        ...this.state.region,
        longitude,
        latitude
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
       <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        {
          this.state.locations.map((location, i) => (
            <MapView.Marker
              key={i}
              coordinate={{
                longitude: location.longitude,
                latitude: location.latitude
              }}
              title={location.description}
              onPress={() => this.setState({ selectedLocation: { description: location.description, uri: location.uri } })}
            />
          ))
        }
        </MapView>
        <Button raised title='Center' onPress={this.center} buttonStyle={styles.buttonStyle} />
        <ImagePreviewer uri={this.state.selectedLocation.uri} />
      </View>
    );
  }
}

export default Map;
export { updateLocations };
