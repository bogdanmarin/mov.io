/**
 *
 * MultivalueRefiner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class MultivalueRefiner extends React.Component {
  render() {
    const { label, values, onValueClicked } = this.props;

    return (
      <div>
        <h2>{label}</h2>
        {values.map(v => (
          <label htmlFor={v.name} key={v.id}>
            <input
              name={v.name}
              checked={v.checked}
              onChange={onValueClicked}
              type="checkbox"
            />
            {v.name}
          </label>
        ))}
      </div>
    );
  }
}

MultivalueRefiner.propTypes = {
  label: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  onValueClicked: PropTypes.func.isRequired,
};

export default MultivalueRefiner;
