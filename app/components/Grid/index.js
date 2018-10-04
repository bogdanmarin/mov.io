/**
 *
 * Grid
 *
 */
import styled, { injectGlobal } from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  font-family: 'Montserrat', sans-serif;
  max-width: ${props => props.maxWidth || '100%'};
  color: #ffff;
  & > div {
    padding: 15px 15px;
  }
  @media (max-width: 900px) {
    zoom: 0.9;
  }
`;

export const GridResponsive = styled.div`
  ${Grid}{
    @media (max-width: 900px) {
      display: inline-block;
      max-width: 100%
    }
  }
`;

export default Grid;
