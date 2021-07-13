/**
 *
 * NoItemFound
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const StyledNoItemFound = styled(Grid)`
  padding: 12px;
  border-radius: 3px;
  font-size: 0.9rem;
  margin-top: ${props => (props.marginTop ? ' 45px' : '')};
  color: #6f7285;
  width: 90%;
  background-color: #e6e7ef;
`;
function NoItemFound({ title, marginTop }) {
  return <StyledNoItemFound noMarginTop={marginTop}>{title}</StyledNoItemFound>;
}

NoItemFound.propTypes = {
  title: PropTypes.string,
};

export default memo(NoItemFound);
