import * as React from 'react';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/reducer';
import { useEffect } from 'react';
import { getTopRatedTVStart } from '../../Redux/modules/tv/topRatedTV';
import { getPopularTVStart } from '../../Redux/modules/tv/popularTV';
import { getAiringTodayStart } from '../../Redux/modules/tv/airingTodayTV';

const Container = styled.div`
  padding: 60px 20px;
`;

const TVPresenter: React.FC = () => {
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

  return loading ? null : (
    <>
      <Helmet>
        <title>TV Shows | Netflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {topRated && topRated.data.length > 0 && (
            <Section title="Top Rated Shows">
              {topRated.data.map((show: any) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date && show.first_air_date.substring(0, 4)}
                  isMovie={false}
                />
              ))}
            </Section>
          )}
          {popular && popular.data.length > 0 && (
            <Section title="Popular Shows">
              {popular.data.map((show: any) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date && show.first_air_date.substring(0, 4)}
                  isMovie={false}
                />
              ))}
            </Section>
          )}
          {airingToday && airingToday.data.length > 0 && (
            <Section title="Airing Today Shows">
              {airingToday.data.map((show: any) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date && show.first_air_date.substring(0, 4)}
                  isMovie={false}
                />
              ))}
            </Section>
          )}
        </Container>
      )}
    </>
  );
};

export default TVPresenter;
