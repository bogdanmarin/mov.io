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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMovieList from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import MovieCard from 'components/MovieCard';
import MultivalueRefiner  from 'components/MultivalueRefiner';

/* eslint-disable react/prefer-stateless-function */
export class MovieList extends React.Component {
  constructor(props){
    super(props);
    this.filterGenre = this.filterGenre.bind(this);
  }
  componentDidMount(){
    let {fetchMovies} = this.props;

    fetchMovies();
  }

  filterGenre(event){
    let {filterGenre} = this.props;
    const target = event.target;
    const checked = target.checked;
    const name = target.name;

    filterGenre({
      name,
      checked
    })
  }

  render() {
    let { movielist } = this.props;
    return (
      <div>
        <Helmet>
          <title>MovieList</title>
          <meta name="description" content="Description of MovieList" />
        </Helmet>
        <MultivalueRefiner label="Genres" values={movielist.genres} property="genres" type="array" onValueClicked={this.filterGenre} />
        {/* <Filter label="Genres" values={movielist.genres} property="vote_average" type="number" /> */}

        {movielist.filteredResults.map((movie)=>{
          return <MovieCard key={movie.id} {...movie}/>
        })}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  movielist: makeSelectMovieList(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchMovies: (filter) => { dispatch(actions.fetchMovies(filter)) },
    filterGenre: (genre) =>{ dispatch(actions.filterGenre(genre)) }
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
