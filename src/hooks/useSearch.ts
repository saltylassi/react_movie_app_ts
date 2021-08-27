import { useState } from 'react';
import { MoviesApi, TVApi } from '../api';

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [movieResults, setMovieResults] = useState<any>([]);
  const [tvResults, setTVResults] = useState<any>([]);
  const [error, setError] = useState<any>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (searchTerm !== '') {
      searchByTerm(searchTerm);
    }
  };

  const updateTerm = (event: any) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(() => value);
  };

  const searchByTerm = async (term: string) => {
    try {
      const {
        data: { results: movieResult },
      } = await MoviesApi.search(searchTerm);
      const {
        data: { results: tvResult },
      } = await TVApi.search(searchTerm);
      setMovieResults(() => movieResult);
      setTVResults(() => tvResult);
    } catch {
      setError(() => 'No Results');
    }
  };
  return {
    movieResults,
    tvResults,
    error,
    handleSubmit,
    updateTerm,
    searchTerm,
  };
};

export default useSearch;
