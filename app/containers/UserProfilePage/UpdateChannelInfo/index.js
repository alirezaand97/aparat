import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReportProblemOutlined } from '@material-ui/icons';
import { Button, InputBase, TextField, Grid } from '@material-ui/core';
import ConfirmModal from 'components/ConfirmModal';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectUserMe,
  makeSelectUpdateChannelInfo,
  makeSelectUpdateUserSocials,
} from 'containers/App/selectors';
import {
  updateChannelInfoAction,
  updateUserSocialsAction,
} from 'containers/App/actions';
import {
  ROUTE_CHANGE_EMAIL,
  ROUTE_CHANGE_MOBILE,
  ROUTE_CHANGE_PASSWORD,
  ROUTE_MY_PROFILE,
} from 'containers/App/routes';
import { push } from 'connected-react-router';

const StledChannelInfoWrapper = styled.div`
  width: 100%;
  margin-top: 3em;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 2rem;

  .inputWrapper {
    width: 60%;
    margin-top: 0.7em;
  }
  .inputWrapper label {
    display: inline-block;
    margin: 0.7em 0.2em;
    font-size: 0.85rem;
    font-weight: 600;
    color: #484b62;
  }
  .inputWrapper .MuiInputBase-input {
    font-size: 0.9em !important;
    color: #484b62 !important;
  }
  .submitData {
    display: block;
    border-radius: 20px;
    font-weight: 300;
    line-height: 2.8;
    padding: 0 2em;
    color: #fff;
    background-color: #05a3e8;
    margin: 2em 0;
  }
  .submitData:hover {
    background-color: #05a3e8;
    box-shadow: 0 1px 8px 0px #00b1ff8c;
  }
  .hr {
    height: 1px;
    background: #d4d1d1;
  }

  .formContainer {
    margin: 2em 0;
  }
  .alignLeft input {
    text-align: left;
    direction: ltr;
  }
  .inputInfo {
    font-size: 0.8rem;
    color: #6f7285;
    display: inline-block;
    margin-bottom: 0.4em;
  }
  .readOnly {
    background: rgb(245, 245, 249);
  }
  .labelWrapper {
    display: flex;
    justify-content: space-between;
  }
  .labelWrapper button {
    color: #05a3e8;
    background: transparent;
  }
`;

function UpdateChannelInfo({
  userData,
  updaeChannelInfo,
  updateSocials,
  dispatch,
  updateChannelInfo,
  updateUserSocials,
}) {
  const [data, setData] = useState({
    channelName: userData.data.channel.name,
    channelInfo: userData.data.channel.info,
    website: userData.data.website,

    socials: userData.data.channel.socials || {
      cloob: '',
      lenzor: '',
      facebook: '',
      twitter: '',
      telegram: '',
    },

    username: userData.data.name,
    email: userData.data.email,
    mobile: userData.data.mobile,
    password: '',
  });

  function handleChangeInputValue(e) {
    const inputValue = e.currentTarget.value;
    const field = e.currentTarget.id.replace('-input', '').split('-');
    if (field[1]) {
      setData(
        { ...data, [field[0]]: { ...data[field[0]], [field[1]]: inputValue } }
      );
    } else {
      setData({ ...data, [field[0]]: inputValue })
    }
  }

  function handleUpdateChannelInfo() {
    const channelInfoData = {
      name: data.channelName,
      info: data.channelInfo,
      website: data.website
    }
    updaeChannelInfo(channelInfoData);
  }

  function handleUpdateSocials() {
    updateSocials(data.socials);
  }

  return (
    <StledChannelInfoWrapper>
      <Grid container className="formContainer">
        <Grid item xs={12}>
          <h3>اطلاعات کانال</h3>
        </Grid>
        <Grid item xs={12} md={10} lg={8} className="inputWrapper">
          <label htmlFor="channelName-input" >نام کانال</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            id="channelName-input"
            defaultValue={data.channelName}
            onChange={(e) => handleChangeInputValue(e)}
          />
        </Grid>

        <Grid item xs={12} md={10} lg={8} className="inputWrapper">
          <label htmlFor="website-input" >وب سایت</label>
          <TextField
            className="alignLeft"
            fullWidth
            variant="outlined"
            size="small"
            id="website-input"
            defaultValue={data.website}
            onChange={(e) => handleChangeInputValue(e)}
          />
        </Grid>
        <Grid item xs={12} md={10} lg={8} className="inputWrapper">
          <label htmlFor="channelInfo-input" >توضیحات کانال</label>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            size="small"
            id="channelInfo-input"
            defaultValue={data.channelInfo}
            onChange={(e) => handleChangeInputValue(e)}
          />
        </Grid>
        <Grid xs={12} >
          <Button
            className="submitData"
            onClick={() => handleUpdateChannelInfo()}
            disabled={!!updateChannelInfo.params}
          >ثبت تغییرات</Button>
        </Grid>
        <Grid item xs={12} md={10} lg={8} className="hr" />

      </Grid>

      <Grid container className="formContainer">
        <Grid item xs={12}>
          <h3>شبکه های اجتماعی</h3>
          <span className="inputInfo">میتوانید آی‌دی کانال خود را در شبکه های اجتماعی برای کاربران به نمایش بگذارید</span>
        </Grid>
        {Object.keys(data.socials).map(key => (
          <Grid item key={key} xs={12} md={10} lg={8} className="inputWrapper">
            <TextField
              className="alignLeft"
              fullWidth
              variant="outlined"
              size="small"
              id={`socials-${key}-input`}
              placeholder={key}
              defaultValue={data.socials[key]}
              onChange={(e) => handleChangeInputValue(e)}
            />
          </Grid>
        ))}

        <Grid xs={12} >
          <Button
            className="submitData"
            onClick={() => handleUpdateSocials()}
            disabled={!!updateUserSocials.params}
          >ثبت تغییرات</Button>
        </Grid>
        <Grid item xs={12} md={10} lg={8} className="hr" />
      </Grid>

      <Grid container className="formContainer">
        <Grid item xs={12}>
          <h3>اطلاعات کاربر</h3>
        </Grid>

        <Grid item xs={12} md={10} lg={8} className="inputWrapper">
          <label htmlFor="username-input" >نام کاربری</label>
          <TextField
            className="readOnly"
            fullWidth
            variant="outlined"
            size="small"
            id="username-input"
            InputProps={{
              readOnly: true,
            }}
            defaultValue={data.username}
          />
        </Grid>
        <Grid item xs={12} md={10} lg={8} className="inputWrapper">
          <div className="labelWrapper">
            <label htmlFor="email-input" >ایمیل</label>
            <Button variant="text" onClick={() => dispatch(push(ROUTE_CHANGE_EMAIL))}>ویرایش ایمیل</Button>
          </div>
          <TextField
            className="alignLeft readOnly"
            fullWidth
            variant="outlined"
            size="small"
            id="email-input"
            InputProps={{
              readOnly: true,
            }}
            defaultValue={data.email}
          />
        </Grid>
        <Grid item xs={12} md={10} lg={8} className="inputWrapper">
          <div className="labelWrapper">
            <label htmlFor="mobile-input" >شماره موبایل</label>
            <Button variant="text" onClick={() => dispatch(push(ROUTE_CHANGE_MOBILE))}>ویرایش شماره موبایل</Button>
          </div>
          <TextField
            className="alignLeft readOnly"
            fullWidth
            variant="outlined"
            size="small"
            id="mobile-input"
            InputProps={{
              readOnly: true,
            }}
            defaultValue={data.mobile}
          />
        </Grid>

        <Grid item xs={12} md={10} lg={8} className="inputWrapper">
          <div className="labelWrapper">
            <label htmlFor="password-input" >گذرواژه</label>
            <Button variant="text" onClick={() => dispatch(push(ROUTE_CHANGE_PASSWORD))}>ویرایش گذرواژه</Button>
          </div>
          <TextField
            className="readOnly"
            fullWidth
            variant="outlined"
            size="small"
            id="password-input"
            InputProps={{
              readOnly: true,
            }}
            defaultValue={data.password}
          />
        </Grid>
      </Grid>
    </StledChannelInfoWrapper >
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updaeChannelInfo: (params) => dispatch(updateChannelInfoAction(params)),
    updateSocials: (params) => dispatch(updateUserSocialsAction(params))
  }
}

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserMe(),
  updateChannelInfo: makeSelectUpdateChannelInfo(),
  updateUserSocials: makeSelectUpdateUserSocials(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo,
)(UpdateChannelInfo);
