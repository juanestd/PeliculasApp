import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../theme/Colors';

const propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
};

const defaultProps = {
  errorText1: 'Wow, parece que ocurrió un problema',
  errorText2: 'Verifique su conexión a internet o reinicie la app',
};

const Error = ({ errorText1, errorText2 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorText1}</Text>
      <Text style={styles.text}>{errorText2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;