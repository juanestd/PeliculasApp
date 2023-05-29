import * as React from 'react';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import { StyleSheet } from 'react-native';

const VideoD = ({ onClose }) => {
  const onBuffer = () => {
    // Función para manejar el buffer del video
  };

  const videoError = () => {
    // Función para manejar los errores del video
  };

  return (
    <VideoPlayer
      onBack={onClose}
      onEnd={onClose}
      fullscreenOrientation="all"
      source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
      ref={(ref) => {
        this.player = ref;
      }}
      onBuffer={onBuffer}
      onError={videoError}
      style={styles.backgroundVideo}
    />
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoD;