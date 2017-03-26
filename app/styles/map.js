
import { StyleSheet } from 'react-native';

const mapStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonStyle: {
    backgroundColor: 'blue',
    borderRadius: 10
  }
});

export default mapStyle;
