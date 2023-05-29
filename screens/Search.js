import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { searchMovieTv } from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = ({ navigation }) => {
  const [text, onChangeText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);

  const onSubmit = (query) => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="chevron-back-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Busca una película o un show de TV"
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableOpacity onPress={() => onSubmit(text)} style={styles.searchButton}>
          <Icon name="search-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchItems}>
        {/* Searched items results */}
        {searchResults.length > 0 ? (
          <FlatList
            numColumns={3}
            data={searchResults}
            renderItem={({ item }) => <Card navigation={navigation} item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : searchResults.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No se encuentran resultados bajo ese criterio.</Text>
            <Text style={styles.noResultsText}>Prueba con otras palabras.</Text>
          </View>
        ) : (
          <View style={styles.empty}>
            <Text>Escribe algo para iniciar tu búsqueda</Text>
          </View>
        )}

        {/* Error */}
        {error && <Error />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 10,
    color: '#000',
  },
  searchButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  searchItems: {
    flex: 1,
    padding: 10,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noResultsText: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;