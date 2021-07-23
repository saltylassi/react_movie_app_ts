import * as React from 'react';
import SearchPresenter from './SearchPresenter';
import { MoviesApi, TVApi } from '../../api';
import { useState } from 'react';

const SearchContainer = () => {
  const [state, setState] = useState({
    loading: false,
    error: '',
    movieResults: {} as any,
    tvResults: {} as any,
    searchTerm: '',
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { searchTerm } = state;
    if (searchTerm !== '') {
      searchByTerm(searchTerm);
    }
  };

  const updateTerm = (event: any) => {
    const {
      target: { value },
    } = event;
    setState(() => {
      return { ...state, searchTerm: value };
    });
  };

  const searchByTerm = async (term: string) => {
    const { searchTerm } = state;
    try {
      const {
        data: { results: movieResults },
      } = await MoviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await TVApi.search(searchTerm);
      setState(() => {
        return { ...state, movieResults, tvResults };
      });
    } catch {
      setState(() => {
        return { ...state, error: 'No Results' };
      });
    }
  };
  const { loading, error, movieResults, tvResults, searchTerm } = state;
  return (
    <SearchPresenter
      loading={loading}
      error={error}
      movieResults={movieResults}
      tvResults={tvResults}
      searchTerm={searchTerm}
      handleSubmit={handleSubmit}
      updateTerm={updateTerm}
    />
  );
};

export default SearchContainer;
