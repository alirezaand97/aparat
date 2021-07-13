/**
 *
 * VideoInfo
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import 'video-react/dist/video-react.css';
import { AccessTime, AddOutlined, AssessmentOutlined, CheckOutlined, Favorite, FavoriteBorderOutlined, FlagOutlined, GetAppOutlined, GetAppRounded, LocalOffer, LocalOfferOutlined, MoreHorizRounded, PlayForWorkRounded, PlaylistPlayOutlined, Repeat, SaveAltOutlined, SettingsOutlined, ShareRounded, VisibilityOutlined } from '@material-ui/icons';
import { Button, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { followChannelAction, likeOrDislikeVideoAction, republishVideoAction, unfollowChannelAction } from 'containers/App/actions';
import ShareSocialModal from 'components/ShareSocialsModal';
import { getAuth, isLogin } from 'utils/auth';
import { push } from 'connected-react-router';
import { ROUTE_LOGIN, ROUTE_MY_CHANNEL, ROUTE_SEARCH, ROUTE_SHOW_VIDEO, ROUTE_UPDATE_VIDEO } from 'containers/App/routes';
import { getCreatedAge } from 'utils/helpers';
import { StyledDropDown, StyledVideoInfo, StyledMoreInfo } from '../styled';

export function VideoInfo({
  video,
  republishVideo,
  likeOrDislikeVideo,
  dispatch,
  followChannel,
  unFollowChannel,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openShareModal, setOpenShareModal] = useState(false);
  const { is_followed } = video.channel;
  const isVideoForMe = isLogin() && video.user_id === getAuth().me.id;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLikeOrDislikeVideo() {
    likeOrDislikeVideo(video.slug, video.liked);
  }

  function handelRepublishVideo() {
    republishVideo(video.slug);
    handleClose();
  }

  function handleFollowOrUnFollow() {
    if (isLogin()) {
      if (is_followed) {
        unFollowChannel(video.channel.name);
      }
      else {
        followChannel(video.channel.name);
      }
    } else {
      dispatch(push(ROUTE_LOGIN));
    }
  }
  function handleRedirectToChannel() {
    dispatch(push(ROUTE_MY_CHANNEL.replace(':name', video.channel.name)));
  }

  function redirectToEditVideo() {
    dispatch(push(ROUTE_UPDATE_VIDEO.replace(':slug', video.slug)));
  }

  function redirectToVideoStatistics() {
    dispatch(push(ROUTE_SHOW_VIDEO.replace(':slug', video.slug)));
  }

  function redirectToTagSearch(tag) {
    dispatch(push(`${ROUTE_SEARCH}?tag=${tag}`));
  }
  return (
    <StyledVideoInfo >
      <div className="videoTitle">
        <h3>{video.title}</h3>
        <span className="views">{video.views}<VisibilityOutlined /></span>
      </div>

      <div className="videoActionContainer">
        <div className="channelNameContainer">
          <img src={video.channel.banner} onClick={() => handleRedirectToChannel()} />
          <div className="channelInfo">
            <b onClick={() => handleRedirectToChannel()}>{video.channel.name}</b>
            <span>{video.channel.follower_count} دنبال کننده</span>
          </div>
        </div>
        <div className="actionWrapper">
          <div className="buttonWrapper">
            <Tooltip title="پسندیدن" aria-label="like">
              <Button className="likeButton" onClick={() => handleLikeOrDislikeVideo()} >
                {video.liked ? (< Favorite style={{ color: "#f50057" }} />) : (<FavoriteBorderOutlined />)}
                <span className="likeCount">{video.like_count}</span>
              </Button>
            </Tooltip>
            <Tooltip title="دانلود ویدیو" aria-label="download">
              <Button><a className="downloadLink" href={video.link} download={video.link}><SaveAltOutlined /></a></Button>
            </Tooltip>
            <Tooltip title="اشتراک گذاری ویدیو" aria-label="share">
              <Button onClick={() => setOpenShareModal(true)}><ShareRounded /></Button>
            </Tooltip>

            {isLogin() && isVideoForMe &&
              <Tooltip title="آمار ویدیو" aria-label="statistic">
                <Button onClick={() => redirectToVideoStatistics()}><AssessmentOutlined /></Button>
              </Tooltip>
            }

            {isLogin() && !isVideoForMe && (
              <React.Fragment>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}><MoreHorizRounded /></Button>
                <StyledDropDown
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} >
                    <FlagOutlined /> گزارش تخلف
                  </MenuItem>
                  <MenuItem onClick={() => handelRepublishVideo()}><Repeat /> بازنشر</MenuItem>
                </StyledDropDown>
              </React.Fragment>
            )}
            <ShareSocialModal url={location.href} open={openShareModal} onCancel={setOpenShareModal} />
          </div>
        </div>
        <div>
          {isLogin() && isVideoForMe ? (
            <Button
              className="settingButton"
              variant="contained"
              onClick={() => redirectToEditVideo()}
            >
              <SettingsOutlined />تنظیمات ویدیو
            </Button>) : (

            <Button
              className="followButton"
              variant={`${is_followed ? 'outlined' : 'contained'}`}
              color={`${is_followed ? '' : 'secondary'}`}
              onClick={() => handleFollowOrUnFollow()}
            >
              {is_followed ? <CheckOutlined /> : <AddOutlined />}
              {is_followed ? 'دنبال شده' : 'دنبال کردن'}
            </Button>
          )}
        </div>

        <StyledMoreInfo>
          <div className="videoDescription">
            {video.info}
          </div>
          <div className="tagContainer">
            <span><AccessTime />{getCreatedAge(video.created_age)}</span>
            {video.playlists[0] && <span><PlaylistPlayOutlined />{video.playlists[0].title}</span>}
            {video.tags &&
              video.tags.map(tag => (
                <span>
                  <span onClick={() => redirectToTagSearch(tag.title)} className="cursorPointer">#{tag.title}</span>

                  # {tag.title}
                </span>

              ))}
          </div>
        </StyledMoreInfo>
      </div >
    </StyledVideoInfo >
  );
}

VideoInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    republishVideo: (slug) => dispatch(republishVideoAction(slug)),
    likeOrDislikeVideo: (slug, like) => dispatch(likeOrDislikeVideoAction(slug, like)),
    followChannel: (name) => dispatch(followChannelAction(name)),
    unFollowChannel: (name) => dispatch(unfollowChannelAction(name)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VideoInfo);
