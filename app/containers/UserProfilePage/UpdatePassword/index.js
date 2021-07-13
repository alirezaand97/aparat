import React, { memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReportProblemOutlined } from '@material-ui/icons';
import { Button, Grid, TextField } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import {
  clearUpdateUserPasswordAction,
  updateUserPasswordAction,
} from 'containers/App/actions';
import { makeSelectUpdateUserPassword } from 'containers/App/selectors';
import { push } from 'connected-react-router';
import { ROUTE_MY_PROFILE } from 'containers/App/routes';

const StledUpdatePasswordWrapper = styled.div`
  width: 100%;
  margin-top: 3em;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 2rem;

  .passwordAlert {
    background: #f5f5f9;
    padding: 1.5em;
    border-radius: 2px;
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .passwordAlert span {
    font-size: 0.9rem;
    display: block;
    margin-bottom: 0.3rem;
  }
  .passwordAlert .MuiSvgIcon-root {
    font-size: 3rem;
    color: #70748e;
    display: inline-block;
    margin-left: 1.5rem;
  }
  .inputWrapper label {
    display: inline-block;
    margin: 0.7em 0.2em;
    font-size: 0.85rem;
    font-weight: 600;
    color: #484b62;
  }
  .submitButton {
    display: block;
    border-radius: 20px;
    font-weight: 300;
    line-height: 2.8;
    padding: 0 2em;
    color: #fff;
    background-color: #05a3e8;
    margin: 2em 0;
  }
  .submitButton:hover {
    background-color: #05a3e8;
    box-shadow: 0 1px 5px 1px #05a3e8;
  }
`;
function UpdatePassword({
  updatePassword,
  userPassword,
  dispatch,
  clearUpdatePassword,
}) {
  const [data, setData] = useState({
    old_password: null,
    new_password: null,
  });

  useEffect(() => {
    if (userPassword.data) {
      dispatch(push(ROUTE_MY_PROFILE));
    }
  }, [userPassword.data]);

  useEffect(() => clearUpdatePassword);

  return (
    <StledUpdatePasswordWrapper>
      <div className="passwordAlert">
        <ReportProblemOutlined />
        <div>
          <span>
            از طریق فرم زیر می توانید نسبت به تغییر گذرواژه خود اقدام فرمایید
          </span>
          <span>
            اگر تاکنون گذرواژه خود را تغییر نداده اید، گذرواژه قبلی شما ایمیل یا
            موبایل با شروع +98 می باشد
          </span>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6} className="inputWrapper">
          <label htmlFor="oldPassword-input">گذرواژه قبلی</label>
          <TextField
            type="password"
            className="alignLeft"
            fullWidth
            variant="outlined"
            size="small"
            id="oldPassword-input"
            onChange={e => setData({ ...data, old_password: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} className="inputWrapper">
          <label htmlFor="newPassword-input">گذرواژه جدید</label>
          <TextField
            type="password"
            className="alignLeft"
            fullWidth
            variant="outlined"
            size="small"
            id="newPassword-input"
            onChange={e => setData({ ...data, new_password: e.target.value })}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        className="submitButton"
        onClick={() => updatePassword(data)}
        disabled={!!userPassword.params}
      >
        {' '}
        ثبت تغییرات
      </Button>
    </StledUpdatePasswordWrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updatePassword: params => dispatch(updateUserPasswordAction(params)),
    clearUpdatePassword: () => dispatch(clearUpdateUserPasswordAction()),
  };
}

const mapStateToProps = createStructuredSelector({
  userPassword: makeSelectUpdateUserPassword(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UpdatePassword);
