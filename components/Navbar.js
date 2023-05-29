import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};

const Navbar = ({ navigation, main }) => {
  return (
    <SafeAreaView style={styles.container}>
      {main ? (
        <View style={styles.mainNav}>
          <Image
            style={styles.logo}
            source={require('../assets/images/cine.png')}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Search');
            }}
            style={styles.searchButton}
          >
            <Icon name={'search-outline'} size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.secondaryNav}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <Icon name={'chevron-back'} size={24} color="#cccccc" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  mainNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  secondaryNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 6,
  },
  searchButton: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: '#888888',
  },
  backButton: {
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#888888',
  },
});

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;