import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator, Text, View, Modal } from 'react-native';
import PlayButton from '../components/PlayButton';
import StarRating from 'react-native-star-rating';
import { getMovie } from '../services/services';
import dateFormat from 'dateformat';
import VideoPlayer from 'react-native-video';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({ route, navigation }) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId)
      .then((movieData) => {
        setMovieDetail(movieData);
        setLoaded(true);
      })
      .catch((error) => {
        console.log('Error al obtener los detalles de la película:', error);
        setError(true);
        setLoaded(true);
      });
  }, [movieId]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && !error && (
        <View style={styles.container}>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? { uri: 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path }
                  : placeholderImage
              }
            />
            <View style={styles.content}>
              <View style={styles.playButton}>
                <PlayButton handlePress={toggleModal} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map((genre) => (
                    <Text style={styles.genre} key={genre.id}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={30}
                rating={movieDetail.vote_average / 2}
                fullStarColor="gold"
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release date: ' + dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.videoModal}>
              <VideoPlayer
                source={{ uri: 'https://example.com/video.mp4' }} // Reemplaza con la URL de tu video
                style={styles.videoPlayer}
                controls
                resizeMode="contain"
              />
            </View>
          </Modal>
        </View>
      )}
      {loaded && error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error al cargar los detalles de la película.</Text>
        </View>
      )}
      {!loaded && !error && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  content: {
    padding: 20,
  },
  image: {
    height: height / 1.4,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#555',
    color: '#fff',
  },
  overview: {
    padding: 15,
    color: '#fff',
  },
  release: {
    fontWeight: 'bold',
    color: '#fff',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoPlayer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default Detail;