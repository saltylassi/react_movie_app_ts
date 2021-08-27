import * as React from 'react';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import Section from '../../Components/Section';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import Helmet from 'react-helmet';
import useSearch from '../../hooks/useSearch';

const Container = styled.div`
  padding: 0px 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

interface SearchProps {
  loading: boolean;
  error: string;
  movieResults: any;
  tvResults: any;
  searchTerm: string;
  handleSubmit: (event: any) => void;
  updateTerm: (event: any) => void;
}

const SearchPresenter: React.FC<SearchProps> = ({ loading }) => {
  const { movieResults, tvResults, error, handleSubmit, updateTerm, searchTerm } = useSearch();

  return loading ? null : (
    <>
      <Helmet>
        <title>Search | Netflix</title>
      </Helmet>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="Search Movies or TV Shows" value={searchTerm} onChange={updateTerm}></Input>
        </Form>
        {loading ? (
          <Loader />
        ) : (
          <>
            {movieResults && movieResults.length > 0 && (
              <Section title="Movie Results">
                {movieResults.map((movie: any) => (
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
            {tvResults && tvResults.length > 0 && (
              <Section title="TV Results">
                {tvResults.map((show: any) => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    imageUrl={show.poster_path}
                    title={show.original_name}
                    rating={show.vote_average}
                    year={show.release_date && show.release_date.substring(0, 4)}
                    isMovie={false}
                  />
                ))}
              </Section>
            )}
            {error && <Message color="#e74c3c" text={error} />}
            {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 && (
              <Message text="Nothing found" color="#95a5a6" />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default SearchPresenter;
