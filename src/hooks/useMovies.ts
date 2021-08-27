import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNowPlayingMovieStart } from '../Redux/modules/movie/nowPlayingMovie';
import { getPopularMovieStart } from '../Redux/modules/movie/popularMovie';
import { getUpcomingMovieStart } from '../Redux/modules/movie/upcomingMovie';
import { RootState } from '../Redux/reducer';

const useMovie = () => {
  const dispatch = useDispatch();
  const nowPlaying = useSelector((state: RootState) => state.nowPlayingMovie);
  const upcoming = useSelector((state: RootState) => state.upcomingMovie);
  const popular = useSelector((state: RootState) => state.popularMovie);
  const loading = nowPlaying.loading && upcoming.loading && popular.loading;

  useEffect(() => {
    dispatch(getNowPlayingMovieStart());
    dispatch(getUpcomingMovieStart());
    dispatch(getPopularMovieStart());
  }, []);

  return { nowPlaying, upcoming, popular, loading };
};

export default useMovie;
