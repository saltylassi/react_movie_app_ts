import * as React from 'react';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Poster from '../../Components/Poster';
import Helmet from 'react-helmet';
import useShows from '../../hooks/useShows';

const Container = styled.div`
  padding: 60px 20px;
`;

const TVPresenter: React.FC = () => {
  const { topRated, popular, airingToday, loading } = useShows();

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
