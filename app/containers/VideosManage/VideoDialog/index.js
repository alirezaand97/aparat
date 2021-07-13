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
import { deleteUserAction, resetUserPasswordAction, updateUsersAction, videoChangeStateAction } from 'containers/App/actions';
import { compose } from 'redux';
import {
  makeSelectUpdateUser,
  makeSelectUserResetPassword,
  makeSelectDeleteUser, makeSelectVideoChangeState
} from 'containers/App/selectors';
import Loading from 'components/Loading';
import ConfirmModal from 'components/ConfirmModal';
import Player from 'video-react/lib/components/Player';
import VideoPlayerContainer from 'containers/MainVideoShowPage/VideoPlayerContainer';
import { VIDEO_STATE_ACCEPTED, VIDEO_STATE_BLOCKED, VIDEO_STATE_CONVERTED } from 'utils/constants';
import { StyledDialog } from '../styles';

function UserDialog({
  onCancel,
  onAccept,
  open,
  video,
  videoChangeState,
  changeStateData
}) {
  const [videoData, setVideoData] = useState(video);

  function handleChangeState(state) {
    const { slug } = video;
    videoChangeState({ slug, state });
  }

  useEffect(() => {
    if (changeStateData.data && changeStateData.data.slug === videoData.slug) {
      setVideoData({ ...videoData, state: changeStateData.data.state });
    }
  }, [changeStateData.data])



  return (
    <StyledDialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{videoData.title}</DialogTitle>
      <DialogContent>
        <VideoPlayerContainer video={videoData} />
      </DialogContent>
      <DialogActions className="updateUserButoonWrapper">
        <div className="actionButtons">
          {videoData.state !== VIDEO_STATE_BLOCKED &&
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => handleChangeState(VIDEO_STATE_BLOCKED)}
            >
              بلاک کردن ویدیو
            </Button>}
          {(videoData.state === VIDEO_STATE_BLOCKED
            || videoData.state === VIDEO_STATE_CONVERTED) &&
            <Button
              color="primary"
              variant="outlined"
              onClick={() => handleChangeState(VIDEO_STATE_ACCEPTED)}
            >
              تایید ویدیو
            </Button>}
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
  changeStateData: makeSelectVideoChangeState()
});

function mapDispatchToProps(dispatch) {
  return {
    videoChangeState: (params) => dispatch(videoChangeStateAction(params))
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo,
)(UserDialog);
