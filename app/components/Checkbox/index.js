/**
 *
 * RefinerCheckbox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  position: relative;

  > input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    height: 17px;
    cursor: pointer;
  }
  > input + label {
    font-family: 'Montserrat', sans-serif;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    &:before {
      content: '';
      position: absolute;
      left:0; top: 1px;
      width: 17px; height: 17px;
      border: 1px solid #aaa;
      background: #f8f8f8;
      border-radius: 3px;
      box-shadow: inset 0 1px 3px rgba(0,0,0,.3)
    }
    &:after {
      content: '✔';
      position: absolute;
      top: -1px; left: 2px;
      font-size: 16px;
      color: #09ad7e;
      transition: all .2s;
    }
  }
  > input:not(:checked) + label {
      &:after {
        opacity: 0;
        transform: scale(0);
      }
  }
  > input:disabled:not(:checked) + label {
      &:before {
        box-shadow: none;
        border-color: #bbb;
        background-color: #ddd;
      }
  }
  > input:checked + label {
    &:after {
      opacity: 1;
      transform: scale(1);
    }
  }
  > input:disabled:checked + label {
    &:after {
      color: #999;
    }
  }
  > input:disabled + label {
    color: #aaa;
  }
  > input:checked:focus + label, input:not(:checked):focus + label {
    &:before {
      border: 1px dotted blue;
    }
  }
`;

class Checkbox extends React.Component {
  render() {
    return (
      <Styled>
        <input onChange={this.props.onChange} type="checkbox" name={this.props.label} checked={this.props.checked} />
        <label htmlFor={this.props.label}>{this.props.label}</label>
      </Styled>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
}

export default Checkbox;
