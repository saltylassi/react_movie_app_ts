import * as React from 'react';
import TVPresenter from './TVPresenter';
import { TVApi } from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';

const TVContainer = () => {
  const [state, setState] = useState({
    topRated: {} as any,
    popular: {} as any,
    airingToday: {} as any,
    loading: false,
    error: '',
  });

  useEffect(() => {
    async function getData() {
      try {
        const {
          data: { results: topRated },
        } = await TVApi.topRated();
        const {
          data: { results: popular },
        } = await TVApi.popular();
        const {
          data: { results: airingToday },
        } = await TVApi.airingToday();
        setState(() => {
          return { ...state, topRated, popular, airingToday };
        });
      } catch {
        setState(() => {
          return { ...state, error: "Can't find TV info" };
        });
      }
    }

    getData();
  }, []);

  const { topRated, popular, airingToday, loading, error } = state;

  return (
    <TVPresenter topRated={topRated} popular={popular} airingToday={airingToday} error={error} loading={loading} />
  );
};

export default TVContainer;
