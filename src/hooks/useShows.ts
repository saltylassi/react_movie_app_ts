import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAiringTodayStart } from '../Redux/modules/tv/airingTodayTV';
import { getPopularTVStart } from '../Redux/modules/tv/popularTV';
import { getTopRatedTVStart } from '../Redux/modules/tv/topRatedTV';
import { RootState } from '../Redux/reducer';

const useShows = () => {
  const topRated = useSelector((state: RootState) => state.topRatedTV);
  const popular = useSelector((state: RootState) => state.popularTV);
  const airingToday = useSelector((state: RootState) => state.airingTV);
  const loading = topRated.loading && popular.loading && airingToday.loading;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopRatedTVStart());
    dispatch(getPopularTVStart());
    dispatch(getAiringTodayStart());
  }, []);

  return { topRated, popular, airingToday, loading };
};

export default useShows;
