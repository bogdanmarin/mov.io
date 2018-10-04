/**
 *
 * RatingRefiner
 *
 */

import React from 'react';
import Rating from '@prontopro/react-rating';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class RatingRefiner extends React.Component {
  render() {
    const { label, value } = this.props;
    return (
      <div>
        <h2>{label}</h2>
        <Rating
          animateOnHover
          initialRate={value}
          fractions={0.5}
          stop={10}
          onClick={this.props.onValueClicked}
        />
      </div>
    );
  }
}

RatingRefiner.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onValueClicked: PropTypes.func.isRequired,
};

export default RatingRefiner;
