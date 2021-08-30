import { all } from 'redux-saga/effects';
import { getNowPlayingMovieSagas } from './modules/movie/nowPlayingMovie';
import { getPopularMovieSagas } from './modules/movie/popularMovie';
import { getUpcomingMovieSagas } from './modules/movie/upcomingMovie';
import { getAiringTodaySagas } from './modules/tv/airingTodayTV';
import { getPopularTVSagas } from './modules/tv/popularTV';
import { getTopRatedTVSagas } from './modules/tv/topRatedTV';
import { getMovieDetailSagas } from './modules/movie/movieDetail';
import { getShowDetailSagas } from './modules/tv/showDetail';
import { getSearchMovieSagas } from './modules/movie/seachmovie';
import { getSearchTVSagas } from './modules/tv/searchTV';

export default function* rootSaga() {
  yield all([
    getNowPlayingMovieSagas(),
    getUpcomingMovieSagas(),
    getPopularMovieSagas(),
    getTopRatedTVSagas(),
    getPopularTVSagas(),
    getAiringTodaySagas(),
    getMovieDetailSagas(),
    getShowDetailSagas(),
    getSearchMovieSagas(),
    getSearchTVSagas(),
  ]);
}
