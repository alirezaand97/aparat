/**
 *
 * ErrorAlert
 *
 */

import React, { memo, useEffect } from 'react';
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
import { createStructuredSelector } from 'reselect';
import { makeSelectNotification } from 'containers/App/selectors';
import { notificationHideAction } from 'containers/App/actions';
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

function Notification({ dispatch, notification, notificationHide }) {
  useEffect(() => {
    if (notification && notification.notifText) {
      setTimeout(notificationHide, 7000);
    }
  }, [notification]);

  function handleRedirectButton() {
    dispatch(push(notification.redirectTo.url));
    notificationHide();
  }

  if (!(notification && notification.notifText)) {
    return null;
  }

  return (
    <React.Fragment>
      <StyledAlert>
        <Alert
          severity={notification.notifType}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={notificationHide}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {notification && notification.notifText}
          {notification.redirectTo && (
            <div className="link">
              <Button
                variant="text"
                color="secondary"
                onClick={() => handleRedirectButton()}
              >
                {notification.redirectTo.text}
                <KeyboardArrowLeftOutlined />
              </Button>
            </div>
          )}
        </Alert>
      </StyledAlert>
    </React.Fragment>
  );
}

Notification.propTypes = {
  error: PropTypes.any,
  errorText: PropTypes.string,
  onCloaseAlert: PropTypes.func,
};
Notification.defaultProps = {
  options: null,
  redirectTo: { url: '/', text: 'صفحه اصلی' },
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    notificationHide: () => dispatch(notificationHideAction()),
  };
}

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Notification);
