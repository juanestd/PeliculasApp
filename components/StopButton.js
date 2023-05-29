import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../theme/Colors';

const StopButton = ({ handlePress }) => {
  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Icon name="chevron-back-circle-sharp" size={30} color={Colors.white} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: Colors.primary,
    elevation: 5,
  },
});

export default StopButton;