/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import NotFoundGif from 'images/download.gif';
import Logo from 'images/aparat_logo.svg';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ROUTE_HOME } from 'containers/App/routes';
import { clearSearchVideosFailAction } from 'containers/App/actions';
const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  p {
    font-size: 0.9rem;
  }

  p span {
    text-decoration: underline;
  }
  .errorGif {
    width: 270px;
  }

  .aparatLogo {
    width: 36px;
    margin-top: 1.5rem;
  }

  .errorRed {
    color: #df0f50;
  }
  .cursorPointer {
    cursor: pointer;
  }
`;
function NotFound({ dispatch, clearError }) {
  useEffect(() => clearError);

  return (
    <NotFoundWrapper>
      <img src={NotFoundGif} className="errorGif" />
      <h1>
        <span className="errorRed">خطای ۴۰۴</span>
        <span> -این ویدیو رو تموم کردیم، ولی مشابه‌اش رو داریم</span>
      </h1>
      <p>
        برای پیدا کردن ویدیو های مشابه عنوان را در{' '}
        <span
          onClick={() => dispatch(push(ROUTE_HOME))}
          className="cursorPointer"
        >
          صفحه اصلی
        </span>{' '}
        جستجو کنید
      </p>
      <img
        src={Logo}
        className="aparatLogo"
        className="aparatLogo cursorPointer"
        onClick={() => dispatch(push(ROUTE_HOME))}
      />
      <p>Error 404 - Page Not Found</p>
    </NotFoundWrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    clearError: () => dispatch(clearSearchVideosFailAction()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NotFound);
