/**
 *
 * MovieCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable camelcase */
class MovieCard extends React.Component {
  render() {
    const { title, overview, poster_path, genres, vote_average } = this.props;

    return (
      <div>
        <h1>
          {title}({vote_average})
        </h1>
        <p>{overview}</p>
        <img
          alt={title}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        />
        <p>Genres: {`${genres.join(' ')}`}</p>
      </div>
    );
  }
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  vote_average: PropTypes.number.isRequired,
};

export default MovieCard;
