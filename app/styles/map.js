
import { StyleSheet } from 'react-native';

const mapStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
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
