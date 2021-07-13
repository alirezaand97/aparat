import React, { memo } from 'react';
import PropsTypes from 'prop-types';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import styled from 'styled-components';
import { OpenInNewOutlined, EditOutlined } from '@material-ui/icons';
import { convertSecondsToTime, getCreatedAge } from 'utils/helpers';
import { ROUTE_UPDATE_VIDEO, ROUTE_VIDEO_MAIN } from 'containers/App/routes';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
const StyledVideoThumbWrapper = styled(Grid)`
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  padding: 2em;
  position: relative;
  .thumbContainer {
    position: relative;
    width: 250px;
    img {
      width: 250px;
      height: 143px;
    }
    .duration {
      position: absolute;
      top: 80%;
      left: 14px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 3px;
      padding: 0 4px;
    }
  }

  .videoInfo {
    padding: 0 1.5em;
    .videoInfoTitle {
      font-size: 1.2em;
      font-weight: 600;
      line-height: 1.8em;
      color: #484b62;
      padding: 0;
      margin: 0;
    }
    .videoInfoDescription {
      display: block;
      margin-top: 10px;
      font-size: 0.9em;
      color: #6c6f88;
    }
    .videoInfoViews {
      margin-top: 8px;
      font-size: 0.9em;
      color: #6c6f88;
      span {
        display: inline-block;
        margin: 0 3px;
      }
    }
  }
  .actions {
    position: absolute;
    top: 12px;
    left: 12px;
    .MuiIconButton-root {
      background: rgba(0, 0, 0, 0.04);
      width: 36px;
      height: 36px;
      margin: 0 3px;
      color: #6f7285;
    }
  }
`;
function VideoThumb({ video, dispatch }) {
  function RedirectToEditPage() {
    dispatch(push(ROUTE_UPDATE_VIDEO.replace(':slug', video.slug)));
  }

  function RedirectToVideoViewPage() {
    dispatch(push(ROUTE_VIDEO_MAIN.replace(':slug', video.slug)));
  }
  return (
    <StyledVideoThumbWrapper container>
      <Grid item className="thumbContainer">
        <img src={video && video.banner_link} />
        <b className="duration">
          {video && convertSecondsToTime(video.duration)}
        </b>
      </Grid>
      <Grid item className="videoInfo">
        <h2 className="videoInfoTitle">{video && video.title}</h2>
        <span className="videoInfoDescription">{video && video.info}</span>
        <p className="videoInfoViews">
          <span>{video && video.views} بازدید</span>-
          <span>{video && getCreatedAge(video.created_age)}</span>
        </p>
      </Grid>
      <div className="actions">
        <Tooltip title="ویرایش ویدیو" aria-label="edit">
          <IconButton onClick={RedirectToEditPage}>
            <EditOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="مشاهده ویدیو" aria-label="view">
          <IconButton onClick={RedirectToVideoViewPage}>
            <OpenInNewOutlined />
          </IconButton>
        </Tooltip>
      </div>
    </StyledVideoThumbWrapper>
  );
}
VideoThumb.propsTypes = {
  video: PropsTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const whitConnect = connect(
  null,
  mapDispatchToProps,
);
export default whitConnect(VideoThumb);
