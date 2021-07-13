import React, { memo, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Input, MenuItem, Select, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  clearDeleteUserDataAction,
  deleteUserAction,
  resetUserPasswordAction,
  updateUsersAction,
} from 'containers/App/actions';
import { compose } from 'redux';
import {
  makeSelectUpdateUser,
  makeSelectUserResetPassword,
  makeSelectDeleteUser,
} from 'containers/App/selectors';
import Loading from 'components/Loading';
import ConfirmModal from 'components/ConfirmModal';
import { StyledDialog } from '../styles';

function UserDialog({
  onCancel,
  onAccept,
  open,
  user,
  updateUser,
  updateUserData,
  deleteUser,
  resetUserPassword,
  userResetPasswordData,
  deleteUserData,
  clearDeleteUserData,
}) {
  const [userData, setUserData] = useState(user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isLoading =
    updateUserData.params ||
    userResetPasswordData.params ||
    deleteUserData.params;

  useEffect(() => {
    if (deleteUserData.data) {
      onCancel();
    }
  }, deleteUserData.data);

  useEffect(() => clearDeleteUserData, []);

  function hanleDeleteUser() {
    deleteUser(user.id);
    setShowDeleteModal(false);
  }

  function handleChangeData(filed, value) {
    setUserData({ ...userData, [filed]: value });
  }

  function handleUpdateUser() {
    updateUser(userData);
  }

  return (
    <StyledDialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {isLoading && <Loading text="در حال پردازش درخواست..." />}
      <ConfirmModal
        onCancel={() => setShowDeleteModal(false)}
        onAccept={() => hanleDeleteUser()}
        open={showDeleteModal}
        title="حذف کاربر"
      >
        آیا مطمئن هستید؟
      </ConfirmModal>

      <DialogTitle id="alert-dialog-title">اطلاعات کاربر</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12} md={6}>
            <label htmlFor="user-name" className="inpLabel">
              نام کاربری
            </label>
            <Input
              id="user-name"
              dir="rtl"
              value={userData.name}
              onChange={e => handleChangeData('name', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item sm={12} md={6} xs={12}>
            <label htmlFor="user-type" className="inpLabel">
              نوع کاربری
            </label>
            <Select
              id="user-type"
              value={userData.type}
              onChange={e => handleChangeData('type', e.target.value)}
              fullWidth
            >
              <MenuItem value="admin">مدیر</MenuItem>
              <MenuItem value="user">کاربر</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={12} md={6} xs={12}>
            <label htmlFor="user-mobile" className="inpLabel">
              {' '}
              موبایل
            </label>
            <Input
              id="user-mobile"
              dir="rtl"
              value={userData.mobile}
              onChange={e => handleChangeData('mobile', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item sm={12} md={6} xs={12}>
            <label htmlFor="user-email" className="inpLabel">
              ایمیل
            </label>
            <Input
              id="user-email"
              dir="rtl"
              value={userData.email}
              onChange={e => handleChangeData('email', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item sm={12} md={12} xs={12}>
            <label htmlFor="user-website" className="inpLabel">
              وب سایت
            </label>
            <Input
              id="user-website"
              dir="rtl"
              value={userData.website}
              onChange={e => handleChangeData('website', e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="updateUserButoonWrapper">
        <div className="actionButtons">
          <Button
            onClick={() => handleUpdateUser()}
            color="primary"
            variant="outlined"
            autoFocus
            disabled={!!updateUserData.params}
          >
            ویرایش
          </Button>
          <Button
            color="primary"
            variant="outlined"
            autoFocus
            onClick={() => resetUserPassword(user.id)}
            disabled={!!userResetPasswordData.params}
          >
            بازنشانی گذرواژه
          </Button>

          <Button
            color="secondary"
            variant="outlined"
            autoFocus
            onClick={() => setShowDeleteModal(true)}
            disabled={!!deleteUserData.params}
          >
            حذف کاربر
          </Button>
        </div>
        <div className="cancelButton">
          <Button onClick={onCancel} color="secondary">
            انصراف
          </Button>
        </div>
      </DialogActions>
    </StyledDialog>
  );
}

UserDialog.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  updateUserData: makeSelectUpdateUser(),
  userResetPasswordData: makeSelectUserResetPassword(),
  deleteUserData: makeSelectDeleteUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateUser: params => dispatch(updateUsersAction(params)),
    deleteUser: params => dispatch(deleteUserAction(params)),
    resetUserPassword: params => dispatch(resetUserPasswordAction(params)),
    clearDeleteUserData: () => dispatch(clearDeleteUserDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserDialog);
