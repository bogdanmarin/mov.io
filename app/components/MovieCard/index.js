/**
 *
 * MovieCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@prontopro/react-rating';
import Grid, {GridResponsive} from 'components/Grid';
import Cell from 'components/Cell';
import styled from 'styled-components';

const MovieSummary = styled.p`
  font-family: 'Montserrat', sans-serif;
`;
const Genre = styled.label`
  border-radius: 5px;
  background-color: #5C2782;
  padding-top:3px;
  padding-bottom:3px;
  padding-left: 7px;
  padding-right: 7px;
  margin:5px;
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
`;

const Poster = styled.img`
  box-shadow: 1px 1px 1px 1px #1f1e1e;
  border-radius: 3px;
}
`;

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable camelcase */
class MovieCard extends React.Component {
  render () {
    const { title, overview, poster_path, genres, vote_average } = this.props

    return (
      <GridResponsive>
        <Grid maxWidth={'60%'}>
          <Cell  columnStart={1} columnEnd={3}>
            <Poster alt={title} src={`https://image.tmdb.org/t/p/w300${poster_path}`} />
          </Cell>
          <Cell columnStart={3} columnEnd={4}>
          <h1>
          {title}
          </h1>
            <Rating
              animateOnHover={false}
              initialRate={vote_average}
              fractions={0.5}
              stop={10} />
            <MovieSummary>
              {overview}
            </MovieSummary>
            {genres.map( g => <Genre key={g}>{g}</Genre>) }
          </Cell>
        </Grid>
      </GridResponsive>
    )
  }
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  vote_average: PropTypes.number.isRequired
}

export default MovieCard
