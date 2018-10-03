/**
 *
 * Cell
 *
 */

import styled from 'styled-components';

const Cell = styled.div`
  grid-column-start: ${props => props.columnStart || 1};
  grid-column-end: ${props => props.columnEnd || 1};
`;

export default Cell;
