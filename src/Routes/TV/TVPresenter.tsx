import * as React from 'react';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import Helmet from 'react-helmet';

const Container = styled.div`
  padding: 60px 20px;
`;

interface TVProps {
  topRated: any;
  popular: any;
  airingToday: any;
  loading: boolean;
  error: string;
}

const TVPresenter: React.FC<TVProps> = ({ topRated, popular, airingToday, loading, error }) => {
  return loading ? null : (
    <>
      <Helmet>
        <title>TV Shows | Netflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Section title="Top Rated Shows">
            {topRated &&
              topRated.length > 0 &&
              topRated.map((show: any) => (
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
          <Section title="Popular Shows">
            {popular &&
              popular.length > 0 &&
              popular.map((show: any) => (
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
          <Section title="Airing Today Shows">
            {airingToday &&
              airingToday.length > 0 &&
              airingToday.map((show: any) => (
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
          {error && <Message color="#e74c3c" text={error} />}
        </Container>
      )}
    </>
  );
};

export default TVPresenter;
