import React from 'react';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Poster from '../../Components/Poster';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getNowPlayingMovieStart } from '../../Redux/modules/movie/nowPlayingMovie';
import { useEffect } from 'react';
import { RootState } from '../../Redux/reducer';
import { getUpcomingMovieStart } from '../../Redux/modules/movie/upcomingMovie';
import { getPopularMovieStart } from '../../Redux/modules/movie/popularMovie';

const Container = styled.div`
  padding: 60px 20px;
`;

const MoviePresenter: React.FC = () => {
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

  useEffect(() => {});

  return loading ? null : (
    <>
      <Helmet>
        <title>Movies | Netflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Helmet>
            <title>Movies | Netflix</title>
          </Helmet>
          {nowPlaying && nowPlaying.data.length > 0 && (
            <Section title="Now Playing Movies">
              {nowPlaying.data.map((movie: any) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date && movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {popular && popular.data.length > 0 && (
            <Section title="Popular Movies">
              {popular.data.map((movie: any) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date && movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {upcoming && upcoming.data.length > 0 && (
            <Section title="Upcoming Movies">
              {upcoming.data.map((movie: any) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date && movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
        </Container>
      )}
    </>
  );
};

export default MoviePresenter;
