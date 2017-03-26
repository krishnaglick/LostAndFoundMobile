
import { StyleSheet } from 'react-native';

const tabBarStyle = StyleSheet.create({
  titleStyle: {
    ...StyleSheet.absoluteFillObject,
    fontWeight: 'bold',
    fontSize: 10
  },
  selectedTitleStyle: {
    ...StyleSheet.absoluteFillObject,
    marginTop: -1,
    marginBottom: 6
  },
  renderIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
  }
});

export default tabBarStyle;
