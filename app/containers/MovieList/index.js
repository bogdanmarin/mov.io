/**
 *
 * MovieList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMovieList from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class MovieList extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>MovieList</title>
          <meta name="description" content="Description of MovieList" />
        </Helmet>
      </div>
    );
  }
}

MovieList.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  movielist: makeSelectMovieList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
