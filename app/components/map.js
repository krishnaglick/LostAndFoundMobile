
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';

import { getLocation, getLocations } from '../helpers/location';

import styles from '../styles/map';

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
      locations: [],
      selectedLocation: {}
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.center = this.center.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.center();
    this.getLocations();
  }

  onRegionChange(region) {
    this.setState({region});
  }

  async getLocations() {
    this.setState({
      locations: await getLocations()
    });
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
              description={location.description}
              onPress={() => this.setState({ selectedLocation: { description: location.description, uri: location.uri } })}
            />
          ))
        }
        </MapView>
        <Button raised title='Center' onPress={this.center} buttonStyle={styles.buttonStyle} />
        <Text>{this.state.selectedLocation.description}</Text>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: this.state.selectedLocation.uri}}
        />
      </View>
    );
  }
}

export default Map;