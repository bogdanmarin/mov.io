/**
 *
 * MultivalueRefiner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
/* eslint-disable react/prefer-stateless-function */
class MultivalueRefiner extends React.Component {
  render() {
    const { label, values, onValueClicked } = this.props;

    return (
      <div>
        <h2>{label}</h2>
        {values.map(v => (
          <Checkbox
            key={v.name}
            label={v.name}
            checked={v.checked}
            onChange={onValueClicked}
          />
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
