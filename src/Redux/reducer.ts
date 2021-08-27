import { combineReducers } from 'redux';
import nowPlayingMovie from './modules/movie/nowPlayingMovie';
import popularMovie from './modules/movie/popularMovie';
import upcomingMovie from './modules/movie/upcomingMovie';
import topRatedTV from './modules/tv/topRatedTV';
import popularTV from './modules/tv/popularTV';
import airingTV from './modules/tv/airingTodayTV';
import movieDetail from './modules/movie/movieDetail';
import showDetail from './modules/tv/showDetail';

const rootReducer = combineReducers({
  nowPlayingMovie,
  popularMovie,
  upcomingMovie,
  topRatedTV,
  popularTV,
  airingTV,
  movieDetail,
  showDetail,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
