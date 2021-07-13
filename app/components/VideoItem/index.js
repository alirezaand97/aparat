/**
 *
 * VideoItem
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  DeleteOutline,
  EditOutlined,
  BarChartOutlined,
} from '@material-ui/icons';
import { convertSecondsToTime } from 'utils/helpers';
import { Grid, IconButton } from '@material-ui/core';

import {
  VIDEO_STATE_BLOCKED,
  VIDEO_STATE_CONVERTED_TITLE,
  VIDEO_STATE_BLOCKED_TITLE,
  VIDEO_STATE_PENDING,
  VIDEO_STATE_PENDING_TITLE,
  VIDEO_STATE_CONVERTED,
} from 'utils/constants';
import { connect } from 'react-redux';
import {
  deleteVideoAction,
  clearVideoDeleteError,
} from 'containers/App/actions';
import { compose } from 'redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import ErrorAlert from 'components/ErrorAlert';
import { createStructuredSelector } from 'reselect';
import { makeSelectDeleteVideo } from 'containers/App/selectors';
import { push } from 'connected-react-router';
import { ROUTE_UPDATE_VIDEO, ROUTE_SHOW_VIDEO } from 'containers/App/routes';
import ConfirmModal from '../ConfirmModal';

const StyledVideoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18%;
  margin: 0 0 0.7em 0.7em;
  height: 250px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  position: relative;

  @media (max-width: 1200px) {
    width: calc(20% - 0.75em);
  }

  @media (max-width: 980px) {
    width: calc(33% - 0.75em);
    .container .avatar img {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 480px) {
    width: calc(50% - 0.75em);
  }

  @media (max-width: 360px) {
    width: calc(100% - 0.75em);
  }

  & .duration {
    position: absolute;
    top: 40%;
    left: 14px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    padding: 0 4px;
  }
  img {
    width: 100%;
    height: 50%;
    max-height: 50%;
    cursor: pointer;
  }

  & .title {
    font-size: 0.9em;
    font-weight: 600;
    line-height: 1.8em;
    color: #484b62;
    display: block;
    overflow: hidden;
    max-height: 40px;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  & .viewsContainer {
    font-size: 0.8em;
    font-weight: 300;
    color: #6f7285;
    margin: 3px 0;
    padding: 0;

    & .tag {
      display: inline-block;
      float: left;
      color: #05a3e8;
      background-color: rgba(5, 163, 232, 0.15);
      border-radius: 3px;
      padding: 1px;
      padding: 0.1em;
    }
  }

  & .contentWrapper {
    padding: 15px;
  }

  & .buttons {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 0 15px;
    margin-bottom: 10px;
  }
  & .button {
    color: #6f7285;
    transition: 200ms ease;
    width: 1em;
    height: 1em;
    font-size: 1.3rem;
    cursor: pointer;
  }
  & .button:hover {
    transform: scale(1.2);
  }
  & .MuiSvgIcon-root:hover {
    color: #df0f50;
  }
`;
function VideoItem({
  video,
  deleteVideo,
  deleteingVideo,
  clearVideoError,
  dispatch,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleDeleteVideo() {
    setShowDeleteModal(false);
    deleteVideo(video);
  }
  function RedirectToEditPage() {
    dispatch(push(ROUTE_UPDATE_VIDEO.replace(':slug', video.slug)));
  }

  function RedirectToVideoPage() {
    if (!video.republished) {
      dispatch(push(ROUTE_SHOW_VIDEO.replace(':slug', video.slug)));
    }
  }

  return (
    <StyledVideoItem item xs={12} sm={6} md={4} lg={3}>
      {deleteingVideo.error && (
        <ErrorAlert
          onCloaseAlert={clearVideoError}
          error={deleteingVideo.error}
          redirectTo={{ url: '/myvideos', text: 'ویدیوهای من' }}
        />
      )}

      <img src={video.banner_link} onClick={RedirectToVideoPage} />
      <b className="duration">{convertSecondsToTime(video.duration)}</b>
      <div className="contentWrapper">
        <b className="title" title={video.title} onClick={RedirectToVideoPage}>
          {video.title}
        </b>
        <div className="viewsContainer">
          <span className="views">{video.views} بازدید</span>
          {!!video.republished && <span className="tag">بازنشر</span>}
          {video.state === VIDEO_STATE_BLOCKED && (
            <span className="tag">{VIDEO_STATE_BLOCKED_TITLE}</span>
          )}
          {video.state === VIDEO_STATE_CONVERTED && (
            <span className="tag">{VIDEO_STATE_CONVERTED_TITLE}</span>
          )}
          {video.state === VIDEO_STATE_PENDING && (
            <span className="tag">{VIDEO_STATE_PENDING_TITLE}</span>
          )}
        </div>
      </div>

      <ConfirmModal
        onCancel={() => setShowDeleteModal(false)}
        onAccept={() => handleDeleteVideo()}
        open={showDeleteModal}
        title="حذف ویدیو"
      >
        آیا مطمئن هستید؟
      </ConfirmModal>
      <div className="buttons">
        <DeleteOutline
          className="button"
          onClick={() => setShowDeleteModal(true)}
        />
        {!video.republished && (
          <React.Fragment>
            <EditOutlined
              className="button"
              onClick={() => RedirectToEditPage()}
            />
            <BarChartOutlined
              className="button"
              onClick={() => RedirectToVideoPage()}
            />
          </React.Fragment>
        )}
      </div>
    </StyledVideoItem>
  );
}

VideoItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  deleteVideo: PropTypes.func.isRequired,
  clearVideoError: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteVideo: video => dispatch(deleteVideoAction(video.slug)),
    clearVideoError: () => dispatch(clearVideoDeleteError()),
  };
}

const mapStateToProps = createStructuredSelector({
  deleteingVideo: makeSelectDeleteVideo(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VideoItem);
