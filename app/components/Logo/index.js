/**
 *
 * Logo
 *
 */

import React, { memo } from 'react';
import PropTypes, { object } from 'prop-types';
import styled from 'styled-components';
import logo from './aparat_logo.svg';
import logoType from './aparat_logo_type_fa.svg';

const sizes = {
  small: 17,
  medium: 27,
  large: 37,
  xlarge: 47,
};

const StyledLogo = styled.div`
  text-align: center;

  img {
    height: ${props => sizes[props.size]}px;
    display: inline-block;
  }
`;

function Logo(props) {
  return (
    <StyledLogo {...props}>
      <img src={logo} alt="آپارات" />
      <img src={logoType} alt="آپارات" />
    </StyledLogo>
  );
}

Logo.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
};

Logo.defaultProps = {
  size: 'medium',
};

export default memo(Logo);
