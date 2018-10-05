/**
 *
 * MovieList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import MovieCard from 'components/MovieCard';
import MultivalueRefiner from 'components/MultivalueRefiner';
import RatingRefiner from 'components/RatingRefiner';
import Grid from 'components/Grid';
import Cell from 'components/Cell';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMovieList from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
export class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.filterGenre = this.filterGenre.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }
  componentDidMount() {
    const { fetchMovies } = this.props;

    fetchMovies();
  }

  filterGenre(event) {
    const { filterGenre } = this.props;
    const { target } = event;
    const { checked } = target;
    const { name } = target;

    filterGenre({
      name,
      checked,
    });
  }

  changeRating(rating) {
    const { filterRating } = this.props;
    filterRating(rating);
  }

  render() {
    const { movielist } = this.props;

    return (
      <div>
        <Helmet>
          <title>Mov.io - Trending now</title>
          <meta name="description" content="Trending movies database" />
        </Helmet>
        <Grid>
          {movielist.fetching && (
            <Cell columnStart={2} columnEnd={3}>
              <h2>Loading...</h2>
            </Cell>
          )}
          <Cell columnStart={1} columnEnd={2}>
            <MultivalueRefiner
              label="Genres"
              values={movielist.genres}
              property="genres"
              type="array"
              onValueClicked={this.filterGenre}
            />
            <RatingRefiner
              label="Rating"
              value={movielist.filter.facets.vote_average.value}
              property="vote_average"
              type="array"
              onValueClicked={this.changeRating}
            />
          </Cell>
          <Cell columnStart={2} columnEnd={4}>
            {movielist.filteredResults.map(movie => (
              <MovieCard key={movie.id} {...movie} />
            ))}
            {!movielist.fetching &&
              movielist.filteredResults.length === 0 && (
              <Cell columnStart={2} columnEnd={3}>
                <h2>Nothing released recently</h2>
              </Cell>
            )}
          </Cell>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  movielist: makeSelectMovieList(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchMovies: filter => {
      dispatch(actions.fetchMovies(filter));
    },
    filterGenre: genre => {
      dispatch(actions.filterGenre(genre));
    },
    filterRating: rating => {
      dispatch(actions.filterRating(rating));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'movieList', reducer });
const withSaga = injectSaga({ key: 'movieList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MovieList);
