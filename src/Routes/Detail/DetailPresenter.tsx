import * as React from 'react';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import Helmet from 'react-helmet';
import Message from '../../Components/Message';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div<{ bgImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div<{ bgImage: string }>`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

interface DetailProps {
  result: {
    original_title?: string;
    original_name?: string;
    backdrop_path?: string;
    poster_path?: string;
    release_date?: string;
    first_air_date?: string;
    runtime: number;
    episode_run_time: Array<number>;
    genres: Array<{ id: number; name: string }>;
    overview: string;
  };
  error?: string;
  loading: boolean;
}

const DetailPresenter: React.FC<DetailProps> = ({ result, error, loading }) => {
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Netfilx</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>{result.original_title ? result.original_title : result.original_name} | Netflix</title>
      </Helmet>
      <Backdrop
        bgImage={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : require('../../assets/noPosterSmall.png')
        }
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterSmall.png')
          }
        />
        <Data>
          <Title>{result.original_title ? result.original_title : result.original_name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date
                ? result.first_air_date.substring(0, 4)
                : null}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time ? result.episode_run_time[0] : 'NaN'} min
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1 ? genre.name : `${genre.name}/`
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
        </Data>
      </Content>
    </Container>
  );
};

export default DetailPresenter;
