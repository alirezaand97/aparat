import React, { memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReportProblemOutlined } from '@material-ui/icons';
import { Button, Grid, TextField } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import {
  cancelUpdateEmailMobile,
  sendChangeEmailMobileConfirmCodeAction,
  updateUserEmailOrMobileAction,
  updateUserPasswordAction,
} from 'containers/App/actions';
import {
  makeSelectUpdateUserEmailOrMobile,
  makeSelectUserMe,
  makeSelectchangeEmailMobileConfirmCode,
} from 'containers/App/selectors';
import { push } from 'connected-react-router';
import { ROUTE_MY_PROFILE } from 'containers/App/routes';
import Loading from 'components/Loading';

const StledUpdateEmaildWrapper = styled.div`
  width: 100%;
  margin-top: 3em;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 2rem;

  .EmailAlert {
    background: #f5f5f9;
    padding: 1.5em;
    border-radius: 2px;
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    .MuiSvgIcon-root {
      font-size: 3rem;
      color: #70748e;
      display: inline-block;
      margin-left: 1.5rem;
    }
    span {
      font-size: 0.9rem;
    }
  }
  .inputWrapper label {
    display: inline-block;
    margin: 0.7em 0.2em;
    font-size: 0.85rem;
    font-weight: 600;
    color: #484b62;
  }
  .submitButton {
    border-radius: 20px;
    font-weight: 300;
    line-height: 2.8;
    padding: 0 2em;
    color: #fff;
    background-color: #05a3e8;
    margin: 2em 0;
  }
  .cancelButton {
    border-radius: 20px;
    font-weight: 300;
    line-height: 2.8;
    padding: 0 2em;
    margin: 2em 0.5em;
  }
  .submitButton:hover {
    background-color: #05a3e8;
    box-shadow: 0 1px 5px 1px #05a3e8;
  }
  .readOnly {
    background: rgb(245, 245, 249);
  }
  .readOnly input {
    font-size: 0.9rem;
    color: #555;
  }
`;
function UpdateEmailOrMobile({
  dispatch,
  type,
  userData,
  submitEmailOrMoblieData,
  UserEmailOrMobileData,
  sendConfirmCode,
  cancelUpdateEmailMobile,
  changeEmailMobileConfirmCode,
}) {
  const isEmail = type === 'email';
  const title = isEmail ? 'ایمیل' : 'شماره موبایل';
  // اگر اطلاعات پیشین رو در استیت بریزیم با ایجاد اطلاعات جدید، اطلاعات پیشین تغییر نمی کنند
  const [data, setData] = useState({
    email: null,
    mobile: null,
  });

  useEffect(() => {
    if (changeEmailMobileConfirmCode.data) {
      cancelUpdateEmailMobile();
    }
  }, [changeEmailMobileConfirmCode.data]);

  const [code, setCode] = useState('');

  function changeInputData(value) {
    if (isEmail) {
      setData({ ...data, email: value });
    } else {
      setData({ ...data, mobile: value });
    }
  }

  function updateEmailOrMobile() {
    if (isEmail) {
      submitEmailOrMoblieData({ email: data.email });
    } else {
      submitEmailOrMoblieData({ mobile: data.mobile });
    }
  }

  return (
    <StledUpdateEmaildWrapper>
      {!UserEmailOrMobileData.data && (
        <React.Fragment>
          <div className="EmailAlert">
            <ReportProblemOutlined />
            <span>{` از طریق فرم زیر می توانید نسبت به تغییر ${title} اقدام کنید `}</span>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6} className="inputWrapper">
              <label htmlFor={`old-${type}-input`}> {`${title} قبلی`}</label>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                type={isEmail ? 'email' : 'mobile'}
                className="alignLeft readOnly"
                fullWidth
                variant="outlined"
                size="small"
                id={`old-${type}-input`}
                defaultValue={
                  isEmail ? userData.data.email : userData.data.mobile
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="inputWrapper">
              <label htmlFor={`new-${type}-input`}>{`${title} جدید`}</label>
              <TextField
                type={isEmail ? 'email' : 'mobile'}
                className="alignLeft"
                fullWidth
                variant="outlined"
                size="small"
                id={`new-${type}-input`}
                onChange={e => changeInputData(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            className="submitButton"
            disabled={!!UserEmailOrMobileData.params}
            onClick={() => updateEmailOrMobile()}
          >
            {' '}
            ثبت تغییرات
          </Button>
        </React.Fragment>
      )}
      {UserEmailOrMobileData.data && (
        <div>
          <Grid item xs={12} md={6} lg={6} className="inputWrapper">
            <label htmlFor="confirm-code">کد فعالسازی را وارد کنید</label>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id="confirm-code"
              onChange={e => setCode(e.target.value)}
            />
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            className="submitButton"
            disabled={code.trim().length < 6 || sendConfirmCode.params}
            onClick={() => {
              sendConfirmCode({ code });
            }}
          >
            {' '}
            ارسال کد فعالسازی
          </Button>
          <Button
            className="cancelButton"
            color="secondary"
            autoFocus
            variant="outlined"
            onClick={() => cancelUpdateEmailMobile()}
          >
            انصراف
          </Button>
        </div>
      )}

      {UserEmailOrMobileData.params && (
        <Loading text="در حال ارسال کد اعتبارسنجی" />
      )}
    </StledUpdateEmaildWrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitEmailOrMoblieData: params =>
      dispatch(updateUserEmailOrMobileAction(params)),
    sendConfirmCode: params =>
      dispatch(sendChangeEmailMobileConfirmCodeAction(params)),
    cancelUpdateEmailMobile: params =>
      dispatch(cancelUpdateEmailMobile(params)),
  };
}

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserMe(),
  UserEmailOrMobileData: makeSelectUpdateUserEmailOrMobile(),
  changeEmailMobileConfirmCode: makeSelectchangeEmailMobileConfirmCode(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UpdateEmailOrMobile);
