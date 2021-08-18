import axios from "axios";

const topMovieIds = [
  "tt0111161",
  "tt0068646",
  "tt0068646",
  "tt0068646",
  "tt0068646",
  "tt0068646",
  "tt0068646",
  "tt0068646",
  "tt0068646",
  "tt0068646",
];

const topMoviesInfo = topMovieIds.map((id) =>
  axios.get(`http://www.omdbapi.com/?i=${id}&apikey=fe5a9562`)
);
export default topMoviesInfo;
