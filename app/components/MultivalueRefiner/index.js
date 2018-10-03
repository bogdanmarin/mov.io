/**
 *
 * MultivalueRefiner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class MultivalueRefiner extends React.Component {
  render() {
    const { label, values, onValueClicked } = this.props;
    debugger;
    return (<div>
        <h2>{label}</h2>
        {values.map((v) => {
          return <label key={v.id}><input name={v.name} checked={v.checked} onChange={onValueClicked} type="checkbox"></input>{v.name}</label>
        })}
    </div>);
  }
}

MultivalueRefiner.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  onValueClicked: PropTypes.func.isRequired
};

export default MultivalueRefiner;
