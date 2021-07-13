/**
 *
 * Loading
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import AparatLogo from 'components/Logo/aparat_logo.svg';
const RotateLogo = keyframes`
100% {
  transform:rotate(360deg)
}
`;
const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f270;

  img {
    animation: ${RotateLogo} 1s linear infinite;
    width: 45px;
    height: 45px;
  }
  span {
    display: inline-block;
    padding-right: 10px;
    font-weight: 600;
    color: #484b62;
  }
`;
function Loading({ text }) {
  return (
    <StyledLoading>
      <img src={AparatLogo} />
      <span>{text}</span>
    </StyledLoading>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
};

Loading.defaultProps = {
  text: 'در حال بارگذاری',
};

export default memo(Loading);
