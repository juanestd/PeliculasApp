import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { getTop_ratedTv, getAiring_todayTv, getNow_playingMovies, getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentaryMovies } from '../services/services';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');

const Home = ({ navigation }) => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [Top_ratedTv, setTop_ratedTv] = useState([]);
  const [Now_playingMovies, setNow_playingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [airing_today, setAiring_todayTv] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = async () => {
    try {
      const [
        Top_ratedTvData,
        airing_todayData,
        Now_playingMoviesData,
        upcomingMoviesData,
        popularMoviesData,
        popularTvData,
        familyMoviesData,
        documentaryMoviesData,
      ] = await Promise.all([
        getTop_ratedTv(),
        getAiring_todayTv(),
        getNow_playingMovies(),
        getUpcomingMovies(),
        getPopularMovies(),
        getPopularTv(),
        getFamilyMovies(),
        getDocumentaryMovies(),
        getNow_playingMovies(),
      ]);

      const moviesImagesArray = upcomingMoviesData.map((movie) => 'https://image.tmdb.org/t/p/w500' + movie.poster_path);
      setTop_ratedTv(Top_ratedTvData);
      setMoviesImages(moviesImagesArray);
      setNow_playingMovies(Now_playingMoviesData);
      setPopularMovies(popularMoviesData);
      setAiring_todayTv(airing_todayData);
      setPopularTv(popularTvData);
      setFamilyMovies(familyMoviesData);
      setDocumentaryMovies(documentaryMoviesData);
    } catch (error) {
      setError(true);
      console.log('Error al obtener los datos:', error);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {loaded && !error ? (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {moviesImages.length > 0 && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={dimensions.height / 1.5}
                autoplay
                circleLoop
              />
            </View>
          )}

          <View style={styles.carousel}>
            <Text style={styles.title}>Películas populares entre el público</Text>
            <List navigation={navigation} content={popularMovies} />
          </View>

          <View style={styles.carousel}>
            <Text style={styles.title}>Peliculas actualmente en los cines</Text>
            <List navigation={navigation} content={Now_playingMovies} />
          </View>

          <View style={styles.carousel}>
            <Text style={styles.title}>Películas familiares</Text>
            <List navigation={navigation} content={familyMovies} />
          </View>

          <View style={styles.carousel}>
            <Text style={styles.title}>Programas de TV mejor clasificados</Text>
            <List navigation={navigation} content={Top_ratedTv} />
          </View>

          <View style={styles.carousel}>
            <Text style={styles.title}>Programas de TV populares</Text>
            <List navigation={navigation} content={popularTv} />
          </View>

          <View style={styles.carousel}>
            <Text style={styles.title}>Programas de TV que se transmiten hoy</Text>
            <List navigation={navigation} content={airing_today} />
          </View>

          <View style={styles.carousel}>
            <Text style={styles.title}>Documentales</Text>
            <List navigation={navigation} content={documentaryMovies} />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          {loaded ? <Error /> : <ActivityIndicator size="large" />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 70, // Ajustar el espacio entre las imágenes y las letras
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    height: dimensions.height / 1.4,
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    marginVertical: 25, // Ajustar el espacio entre las secciones
    paddingHorizontal: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20, // Ajustar el tamaño de las letras
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;