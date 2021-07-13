/**
 *
 * Login
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Card, Paper, InputBase, CardContent } from '@material-ui/core';
import { ArrowForward, Person as PersonIcon, Lock } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

import Alert from '@material-ui/lab/Alert';
import Loading from 'components/Loading';
import styled from 'styled-components';
import makeSelectLoginPage from '../selectors';
import { loginAction, loginReinit } from '../actions';

const StyledLoginWrapper = styled(Card)`
  .label {
    height: 30px;
    line-height: 30px;
  }

  .formInput {
    padding: 0 2px;
    display: flex;
    min-width: 100%;
    align-items: center;
    height: 28px;
    margin-top: 8px;
  }
  .input {
    margin-left: 8px;
    flex: 1px;
    font-size: 13px;
    color: #808080;
  }

  .inputIcon {
    color: #808080;
    margin-left: 8px;
  }
  .alert {
    direction: rtl;
  }
  .loginAlert {
    margin-bottom: 5px;
  }
`;

export function Login({ onLoginSubmit, data, onHideError, handetoRegister }) {
  const [username, setUsername] = useState('admin@aparat.com');
  const [password, setPassword] = useState('123456');
  return (
    <StyledLoginWrapper>
      {data.username && <Loading text="در حال ورود..." />}
      {data.error ? (
        <Alert
          className="loginAlert"
          color="error"
          icon={false}
          onClose={() => {
            onHideError();
          }}
        >
          اطلاعات وارد شده مطابقت ندارد
        </Alert>
      ) : null}

      <Grid container className="actionArea">
        <Grid item xs={12} sm={8}>
          <span className="label">
            اگر در آپارات حساب کاربری ندارید، ثبت نام کنید:
          </span>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
            onClick={() => handetoRegister(true)}
          >
            ایجاد حساب کاربری
          </Button>
        </Grid>
      </Grid>

      <CardContent className="actionArea">
        <div className="label">اگر در آپارات حساب کاربری دارید، وارد شوید:</div>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="flex-end"
        >
          <Grid item xs={12} sm={9}>
            <Paper className="formInput">
              <PersonIcon className="inputIcon" />
              <InputBase
                className="input"
                placeholder="موبایل یا نام کاربری و یا ایمیل"
                defaultValue={username}
                onChange={e => setUsername(e.target.value.trim())}
              />
            </Paper>
            <Paper className="formInput">
              <Lock className="inputIcon" />
              <InputBase
                className="input"
                placeholder="گذرواژه خود را وارد کنید"
                defaultValue={password}
                onChange={e => setPassword(e.target.value.trim())}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              fullWidth
              onClick={() => onLoginSubmit(username, password)}
              disabled={!!(data && data.username)}
            >
              ورود
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </StyledLoginWrapper>
  );
}

Login.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoginSubmit: (username, password) =>
      dispatch(loginAction(username, password)),

    onHideError: () => dispatch(loginReinit()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Login);
