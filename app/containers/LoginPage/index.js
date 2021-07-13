/**
 *
 * LoginPage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Grid,
  makeStyles,
  Card,
  Paper,
  InputBase,
  CardContent,
} from '@material-ui/core';
import { ArrowForward, Person as PersonIcon, Lock } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Dump from 'components/Dump';
import Logo from 'components/Logo';

import Alert from '@material-ui/lab/Alert';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Loading from 'components/Loading';
import styled, { keyframes } from 'styled-components';
import CssTransition from 'react-transition-group/CSSTransition';
import { push } from 'connected-react-router';
import { ROUTE_HOME } from 'containers/App/routes';
import bgImage from 'images/bg.jpg';
import Notification from 'components/Notification';
import Register from './Register';
import Login from './Login';
import { loginAction, loginReinit } from './actions';
import saga from './saga';
import reducer from './reducer';
import makeSelectLoginPage from './selectors';
const StyledAnimation = keyframes`
0% {transform:translateX(-60%); opacity: .2;  }
100% { transform:translateX(0);opacity: 1; }
`;

const StyledWrapper = styled(Grid)`
  background: url(${bgImage});
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .wrapper {
    max-width: 400px;
    min-height: 100vh;
    min-height: 100vh;
    padding: 1rem;
  }
  .actionArea {
    border-bottom: 1px solid #eee;
    padding: 20px 16px;
  }

  .logo {
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .backButton {
    margin-bottom: 16px;
    display: inline-block;
    padding-right: 20px;
  }
  .arrowIcon {
    font-size: 14px;
    margin-left: 10px;
    display: inline-block;
    height: 20px;
    position: absolute;
    right: 5px;
  }

  .formContainer {
    animation: ${StyledAnimation} 0.9s ease;
  }
`;

export function LoginPage({ redirect }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const [toRegister, setToRegister] = useState(false);

  return (
    <StyledWrapper
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Notification />
      <Helmet>
        <title>ورود</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>

      <Grid item xs={12} className="wrapper">
        <Grid item xs={12}>
          <Logo className="logo" />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            className="backButton"
            size="small"
            onClick={() => redirect(ROUTE_HOME)}
          >
            <ArrowForward className="backIcon" /> بازگشت{' '}
          </Button>
        </Grid>

        <Grid item xs={12} className="formContainer">
          <CssTransition
            in={toRegister}
            timeout={{
              enter: 900,
              appear: 900,
              exit: 0,
            }}
            mountOnEnter
            unmountOnExit
            classNames={{
              enterActive: 'formContainer',
            }}
          >
            <Register handetoRegister={setToRegister} />
          </CssTransition>
          <CssTransition
            in={!toRegister}
            timeout={{
              enter: 900,
              appear: 900,
              exit: 0,
            }}
            mountOnEnter
            unmountOnExit
            classNames={{
              enterActive: 'formContainer',
            }}
          >
            <Login handetoRegister={setToRegister} />
          </CssTransition>
        </Grid>
      </Grid>
    </StyledWrapper>
  );
}

LoginPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    redirect: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(LoginPage);
