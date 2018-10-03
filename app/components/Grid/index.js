/**
 *
 * Grid
 *
 */

import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;

  > div {
    padding: 20px 0;
  }
`;

export default Grid;
