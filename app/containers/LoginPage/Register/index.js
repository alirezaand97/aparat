/**
 *
 * Register
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Card, Paper, InputBase, CardContent } from '@material-ui/core';
import {
  ArrowForward,
  Person as PersonIcon,
  Lock,
  PhoneIphoneOutlined,
  VerifiedUser,
} from '@material-ui/icons';
import Button from '@material-ui/core/Button';

import Alert from '@material-ui/lab/Alert';
import Loading from 'components/Loading';
import styled from 'styled-components';
import emailBoxImage from 'images/download.svg';
import {
  registerAction,
  registerReInit,
  verificationAction,
  verificationReInitAction,
} from '../actions';
import makeSelectRegisterPage, {
  makeSelectRegisterUser,
  makeSelectVerificationUser,
} from '../selectors';

const StyledRegisterWrapper = styled(Card)`
  .label {
    height: 30px;
    line-height: 30px;
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
  .RegisterAlert {
    margin-bottom: 5px;
  }
  .verificationSended {
    padding: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .verificationSended .text {
    display: block;
    font-size: 0.9rem;
    font-weight: bold;
    color: rgb(119, 119, 119);
    line-height: 2;
    padding: 2rem;
  }
  .verificationButton {
    margin-top: 10px;
  }
`;

export function Register({
  handetoRegister,
  registerUser,
  registerData,
  reInitRegister,
  verificationUser,
  verificationData,
  reInitVerification,
}) {
  const [username, setUsername] = useState(null);
  const [verifyCode, setVerifyCode] = useState(null);
  const [error, setError] = useState(null);
  const mobileRegex = RegExp(/^(\+?98|0098|98|0)9\d{9}$/);
  const emailRegex = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  useEffect(() => reInitRegister, []);
  useEffect(() => reInitVerification, []);

  function handleChangeUserName(value) {
    const emailPassed = emailRegex.test(value);
    const mobilePassed = mobileRegex.test(value);

    const params = null;
    if (mobilePassed) {
      setUsername({ mobile: value });
      setError(null);
    }
    if (emailPassed) {
      setUsername({ email: value });
      setError(null);
    }
    if (!mobilePassed && !emailPassed) {
      setUsername(null);
      setError('اطلاعات خود را درست وارد کنید');
    }
  }

  function handleChangeVerificaionCode(code) {
    setVerifyCode(code);
  }

  function handleRegisterUser() {
    registerUser(username);
  }

  function handleVerificationUser() {
    const verifyParams = { ...username, code: verifyCode };
    verificationUser(verifyParams);
  }

  return (
    <div>
      {verificationData && verificationData.data && (
        <Loading text="ثبت نام تکمیل شد. در حال ورود..." />
      )}
      {registerData && registerData.params && (
        <Loading text="در حال ارسال کد فعالسازی..." />
      )}
      {registerData && !registerData.data ? (
        <StyledRegisterWrapper>
          <Grid container className="actionArea">
            <Grid item xs={12} sm={8}>
              <span className="label">اگر حساب کاربری دارید وارد شوید:</span>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                fullWidth
                onClick={() => handetoRegister(false)}
              >
                ورود به آپارات
              </Button>
            </Grid>
          </Grid>
          <CardContent className="actionArea">
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
              <React.Fragment>
                <Grid item xs={12} sm={9}>
                  <h4>موبایل یاایمیل را وارد کنید</h4>
                  <Paper className="formInput">
                    <PhoneIphoneOutlined className="inputIcon" />
                    <InputBase
                      className="input"
                      placeholder="موبایل یا ایمیل"
                      onChange={e =>
                        handleChangeUserName(e.target.value.trim())
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    disabled={error || !username}
                    fullWidth
                    onClick={() => handleRegisterUser()}
                  >
                    ادامه
                  </Button>
                </Grid>
              </React.Fragment>
            </Grid>
          </CardContent>
        </StyledRegisterWrapper>
      ) : (
        <StyledRegisterWrapper>
          <div className="verificationSended">
            <img src={emailBoxImage} />
            <span className="text">
              پیامی حاوی کد فعالسازی جهت تکمیل ثبت نام برای شما ارسال شده. لطفا
              کد را در کادر زیر وارد کنید
            </span>
            <Paper className="formInput">
              <VerifiedUser className="inputIcon" />
              <InputBase
                className="input"
                placeholder="کد را وارد کنید"
                onChange={e =>
                  handleChangeVerificaionCode(e.target.value.trim())
                }
              />
            </Paper>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className="verificationButton"
              fullWidth
              disabled={!verifyCode || verifyCode.length < 6}
              onClick={() => handleVerificationUser()}
            >
              تکمیل ثبت نام
            </Button>
          </div>
        </StyledRegisterWrapper>
      )}
    </div>
  );
}

Register.propTypes = {};

const mapStateToProps = createStructuredSelector({
  registerData: makeSelectRegisterUser(),
  verificationData: makeSelectVerificationUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    registerUser: params => dispatch(registerAction(params)),
    verificationUser: params => dispatch(verificationAction(params)),
    reInitRegister: () => dispatch(registerReInit()),
    reInitVerification: () => dispatch(verificationReInitAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Register);
