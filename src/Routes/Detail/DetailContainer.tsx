/* eslint-disable no-lone-blocks */
import * as React from 'react';
import DetailPresenter from './DetailPresenter';
import { MoviesApi, TVApi } from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';

interface DetailProps {
  match: {
    params: { id: string };
  };
  history: { push: any };
  location: { pathname: string };
}

const DetailContainer: React.FC<DetailProps> = (props) => {
  const {
    location: { pathname },
  } = props;

  const [state, setState] = useState({
    result: {} as any,
    error: '',
    loading: true,
    isMovie: pathname.includes('/movie/'),
  });

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = props;

    const { isMovie } = state;

    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push('/');
    }

    let result: any = null;

    async function getData() {
      try {
        {
          isMovie
            ? ({ data: result } = await MoviesApi.movieDetail(parsedId))
            : ({ data: result } = await TVApi.showDetail(parsedId));
        }
      } catch {
        setState(() => {
          return { ...state, error: 'nope' };
        });
      } finally {
        setState(() => {
          return { ...state, loading: false, result };
        });
      }
    }
    getData();
  }, []);
  const { error, loading, result } = state;
  return <DetailPresenter result={result} error={error} loading={loading} />;
};

export default DetailContainer;
