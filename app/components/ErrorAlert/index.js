/**
 *
 * ErrorAlert
 *
 */

import React, { memo } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { ROUTE_MY_VIDEOS, ROUTE_HOME } from 'containers/App/routes';
import { KeyboardArrowLeftOutlined } from '@material-ui/icons';

const StyledAlert = styled.div`
  & .MuiAlert-root {
    position: fixed;
    bottom: 2em;
    left: 2em;
    z-index: 10001;
  }
  .link {
    margin-top: 10px;
  }
  .errorTitle {
    margin: 0 5px;
  }
  .MuiAlert-icon {
    display: none;
  }
`;

const errorStatus = {
  404: 'ویدیوی مورد نظر یافت نشد',
  401: 'شما به این عمل دسترسی ندارید',
  500: 'خطایی در سیستم رخ داده است مجددا تلاش کنید',
  403: 'دسترسی ندارید',
};

function ErrorAlert({
  errorText,
  errorType,
  onCloaseAlert,
  error,
  options,
  dispatch,
  redirectTo,
}) {
  function RenderError() {
    if (options) {
      if (options[error.response.status]) {
        return options[error.response.status];
      }
      if (options[error.request.status]) {
        return options[error.request.status];
      }
    }
    if (errorStatus[error.response.status]) {
      return errorStatus[error.response.status];
    }
    if (errorStatus[error.request.status]) {
      return errorStatus[error.request.status];
    }

    return 'خطایی رخ داده است. مجددا تلاش کنید';
  }

  // setTimeout(onCloaseAlert, 5000);

  function handleRedirectButton() {
    dispatch(push(redirectTo.url));
    onCloaseAlert();
  }
  return (
    <React.Fragment>
      <StyledAlert>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                onCloaseAlert();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {errorText && errorText}
          {!errorText && error && RenderError()}
          {redirectTo && (
            <div className="link">
              <Button
                variant="text"
                color="secondary"
                onClick={() => handleRedirectButton()}
              >
                {redirectTo.text}
                <KeyboardArrowLeftOutlined />
              </Button>
            </div>
          )}
        </Alert>
      </StyledAlert>
    </React.Fragment>
  );
}

ErrorAlert.propTypes = {
  error: PropTypes.any,
  errorText: PropTypes.text,
  onCloaseAlert: PropTypes.func,
};
ErrorAlert.defaultProps = {
  options: null,
  redirectTo: { url: '/', text: 'صفحه اصلی' },
  errorType: 'error',
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ErrorAlert);
