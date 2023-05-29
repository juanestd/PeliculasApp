import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=0a31a928954da44adc698dcb8bfe3902';

// Obtener programas de tv mejor clasificados
export const getTop_ratedTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/top_rated?${apiKey}`);
  return resp.data.results;
};



// Obtener programas de tv que se emitirán hoy
export const getAiring_todayTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/airing_today?${apiKey}`);
  return resp.data.results;
};



// Obtener peliculas ahora mismo en cartelera
export const getNow_playingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/now_playing?${apiKey}`);
  return resp.data.results;
};

// Obtener peliculas populares
export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};

// Obtener próximas películas
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return resp.data.results;
};

// Obtener programas de tv populares
export const getPopularTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return resp.data.results;
};

// Obtener peliculas de familia 
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return resp.data.results;
};

// Obtener documentales
export const getDocumentaryMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return resp.data.results;
};

export const getMovie = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return resp.data;
};

// Búsqueda de películas o programas de televisión por palabra clave
export const searchMovieTv = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return resp.data.results;
};