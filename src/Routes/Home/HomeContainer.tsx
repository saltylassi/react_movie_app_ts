import * as React from 'react';
import HomePresenter from './HomePresenter';
import { MoviesApi } from '../../api';
import { useState, useEffect } from 'react';

const HomeContainer = () => {
  const [state, setState] = useState({
    nowPlaying: {} as any,
    upcoming: {} as any,
    popular: {} as any,
    error: '',
    loading: true,
  });

  useEffect(() => {
    async function getDatas() {
      try {
        const {
          data: { results: nowPlaying },
        } = await MoviesApi.nowPlaying();
        const {
          data: { results: popular },
        } = await MoviesApi.popular();
        const {
          data: { results: upcoming },
        } = await MoviesApi.upcoming();
        setState(() => {
          return { ...state, nowPlaying, popular, upcoming, loading: false };
        });
      } catch {
        setState(() => {
          return { ...state, error: "Can't find movie info", loading: false };
        });
      }
    }

    getDatas();
  }, []);

  const { nowPlaying, upcoming, popular, error, loading } = state;

  return (
    <HomePresenter nowPlaying={nowPlaying} upcoming={upcoming} popular={popular} error={error} loading={loading} />
  );
};

export default HomeContainer;
