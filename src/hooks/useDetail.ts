import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getMovieDetailStart } from '../Redux/modules/movie/movieDetail';
import { getShowDetailStart } from '../Redux/modules/tv/showDetail';
import { RootState } from '../Redux/reducer';

const useDetail = () => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();
  const isMovie = pathname.includes('/movie/');
  const result: any = useSelector((state: RootState) => {
    return isMovie ? state.movieDetail : state.showDetail;
  });
  const { data, loading, error } = result;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMovie) {
      dispatch(getMovieDetailStart(id));
    } else {
      dispatch(getShowDetailStart(id));
    }
  }, []);

  return { isMovie, id, push, data, loading, error };
};

export default useDetail;
